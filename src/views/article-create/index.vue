<template>
  <div>
    <!-- 外层卡片 -->
    <el-card>
      <!-- 标题框 -->
      <el-input
        v-model="input"
        placeholder="请输入标题"
        class="title"
      ></el-input>
      <!-- 这里写 tab切换 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="markdown" name="first">
          <div ref="toastEditor"></div>
        </el-tab-pane>
        <el-tab-pane label="富文本" name="second">
          <div ref="div1"></div>
          <textarea
            v-show="false"
            ref="$text"
            style="width: 100%; height: 200px"
          ></textarea>
        </el-tab-pane>
      </el-tabs>
      <!-- 这是点击提交1文章的按钮 -->
      <el-button type="primary" class="button" @click="submit">提交</el-button>
    </el-card>
  </div>
</template>
<script setup>
import { onMounted, ref, defineProps, watch } from 'vue'
// 导入 md 编辑器
import Editor from '@toast-ui/editor'
// 导入 md ui 样式
import '@toast-ui/editor/dist/toastui-editor.css'

// 导入富文本编辑器
import E from 'wangeditor'
// 导入创建文章接口,--- 引入文章详情接口 --- 引入编辑文章
import { createArticle, articleDetail, editArticle } from '@/api/article.js'
// 导入路由
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// props参数  能直接这样获取，这就是布尔模式 类型是id 就是字符串，是必传项
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
console.log(props.id, '这就是id')
// 使用路由
const router = useRouter()

// 收集input数据
const input = ref('')

// 这是tab默认选中的项 // 默认选中 first
const activeName = ref('first')
// 这是监测tab切换的事件 (它会接收两个参数)
const thisActiveLabel = ref({})
// 因为第一次进来不会触发这个事件，所以 thisActive 赋值赋不上，所以判断就默认写在else里，让他执行第一个编辑框的逻辑
const handleClick = (tab, event) => {
  // 第一个参数是当前切换tab的信息，第二个参数是event事件
  console.log(tab, '我想给你看看这个数据')
  // 通过这个可以判断当前点击的是哪个选项
  thisActiveLabel.value = tab.props.label
}

// #region 这是 md 编辑器
// 获取元素dom 要获取 md 这个里面的内容，就用 editors
const toastEditor = ref(null)
let editors
const toastEditorFn = () => {
  editors = new Editor({
    el: toastEditor.value,
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical'
  })
  editors.getMarkdown()
  // 设置占位符（提示语）
  editors.setPlaceholder('请输入内容')
}
// #endregion

// dom挂载完成执行
onMounted(() => {
  // 执行 md 文本编辑器
  toastEditorFn()
  // 执行富文本编辑器
  editorFn()
})

// #region  这是富文本编辑器
// 这是富文本编辑器
let editor
// 输入文本标签
const $text = ref(null)
// 富文本标签
const div1 = ref(null)
// 由于es6提出1的这两个声明变量的1方式都是块级作用域，所以要用let放在外边，方便等下使用
// 刚刚说过，这里面他要获取dom,vue有生命周钩子，等待dom挂载完成才能拿到dom
// 等dom挂载完成调用 editorFn 就行了
const editorFn = () => {
  editor = new E(div1.value)
  // 配置 onchange 回调函数 监听回调
  editor.config.onchange = function (newHtml) {
    console.log('9999', newHtml)
    console.log($text, '00000')
    $text.value.value = newHtml // 这就拿到标签了再.value能操作他的value值
  }
  editor.create()
  // 这就算集成进来了，但是还缺少一个监听事件，我演示给你看
}
// #endregion

// 这是提交的方法
const submit = async () => {
  // 使用同一个提交方法，所以要做判断
  const title = input.value
  let content
  // 把第一个编辑框的判断写在else里面
  // 如果 thisActiveLabel 存在，并且 他全等于 富文本 才执行否则执行else
  if (thisActiveLabel.value === '富文本') {
    // 不能用 md 做判断，要用富文本
    // 这里就是判断当前处在哪个tab选项，就给那个文本框赋值
    // 这里是上午的富文本
    content = $text.value.value
  } else {
    // 编辑器
    content = editors.getHTML()
  }
  // 1.就可以提交请求了 简写形式，这里就能拿到这两个参数了
  // 这次判断写这里，判断当前是新建还是修改
  // 还是通过 props.id判断，没有值的话就是 :id 就不执行修改，那就是发布文章
  if (props.id !== ':id') {
    // 修改文章，发送请求，先写接口,这个接口接收三个参数,有简写形式
    await editArticle({ id: props.id, title, content })
    ElMessage.success('文章修改成功！')
  } else {
    // 发布文章
    await createArticle({ title, content }) // 这里也是简写形式
    // 3.提示用户提交成功
    ElMessage.success('文章创建成功！')
  }

  // 2.跳转路由到文章排名
  router.push('/article/ranking')
}

// 导航栏那个  61c232406248832231776969  是传过来的 id 到这边又请求的数据
/**
 * 1.点击文章排名，点击编辑 -- 已完成
 * 2.把当前文章的 id 通过路由传递到创建文章这个页面 -- 已完成
 * 3.到这个页面之后，发起请求，拿到当前文章的数据 -- 已完成
 * 4.展示在编辑器里面，进行编辑，执行发布 -- 已完成
 *
 */

// 就监听 id 的变化，进行请求
watch(
  () => props.id,
  async (newVal) => {
    // 这里能拿到 刚刚说到，有两种情况，1.传参就能拿到id 2。不传参拿到的就是占位符 :id,然后当参数为 :id的时候就不请求
    if (newVal !== ':id') {
      // 这里说明有参数，可以请求，先去写API
      const res = await articleDetail(newVal) // 它接收一个id,刚好就有
      console.log(res, '文章详情')
      // 先把标题放进来
      input.value = res.title
      // 把内容放进 md 编辑器里面
      // 这个方法也是 editors 身上的
      editors.setHTML(res.content)

      // 把内容也要写进富文本里面
      // editor，看一下这个文档
      editor.txt.html(res.content)
      // 使用同一个提交事件
    }
  },
  { immediate: true } // 要加上初始化执行
)
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 20px;
}
.button {
  float: right;
  margin: 20px 0;
}
</style>
