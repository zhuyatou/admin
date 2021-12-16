<template>
  <div :class="{ show: isShow }" class="header-search">
    <!-- 图标 -->
    <svg-icon
      iconName="search"
      className="search-icon"
      @click.stop="toggleShow"
    />
    <!-- select 下拉选项 -->
    <el-select
      v-model="search"
      placeholder="Select"
      class="header-search-select"
      filterable
      remote
      :remote-method="querySearch"
      @change="onSelectChange"
      default-first-option
      ref="searchSelectRef"
    >
      <el-option
        v-for="option in searchResult"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouter, generateFuse } from '@/utils/router.js'
import Fuse from 'fuse.js'
import { watchLang } from '@/utils/i18n.js'

const searchSelectRef = ref(null)
const isShow = ref(false)
const toggleShow = () => {
  if (isShow.value) {
    // 收起
    isShow.value = false
    search.value = ''
    searchResult.value = []
    searchSelectRef.value.blur()
  } else {
    // 展开
    isShow.value = true
    search.value = ''
    searchResult.value = []
    // 展开自动获取焦点
    searchSelectRef.value.focus()
  }

  // 展开自动获取焦点
}

// 用户输入检索的字符串
const search = ref('')

const searchResult = ref([])
// 检索方法
const querySearch = (query) => {
  console.log(fuse.search(query))
  searchResult.value = fuse.search(query)
}

// 选中option 触发的方法
const onSelectChange = (value) => {
  // search 修改
  search.value = value.title.join('>')
  // 跳转
  router.push(value.path)
}

// 准备数据源
const router = useRouter()
let list = computed(() => {
  // 去重
  const filterRoutes = filterRouter(router.getRoutes())
  // 格式化路由 条件:1.具备meta && meat.title 2.过滤掉动态路由
  return generateFuse(filterRoutes)
})

// 初始化 fuse.js --> 模糊搜索工具
let fuse
const initFuse = (list) => {
  fuse = new Fuse(list, {
    shouldSort: true, // 搜索的结果是否按照优先级排序
    minMatchCharLength: 1, // 搜索的字符有效最小长度
    keys: [
      {
        name: 'path', // 搜索的字段
        weight: 0.7 // 如果多条搜索方式同时命中同一天数据按照权重高的记录
      },
      {
        name: 'title',
        weight: 0.3
      }
    ]
  })
}
initFuse(list.value) // list 数据源
// 监听language的切换动作
watchLang((lang) => {
  list = computed(() => {
    // 去重
    const filterRoutes = filterRouter(router.getRoutes())
    // 格式化路由 条件:1.具备meta && meat.title 2.过滤掉动态路由
    return generateFuse(filterRoutes)
  })
  initFuse(list.value)
})

// 问题1:收缩的时候 清空上一次的search和下拉列表数据
// 问题2:点击其他位置 search 收起

// 只执行一次
// onMounted(() => {
//   console.log('--->', document)
//   // isShow --> true --> 绑定事件
//   // isShow --> false --> 取消绑定
//   if (isShow.value) {
//     document.body.addEventListener('click', onClose)
//   } else {
//     document.body.removeEventListener('click', onClose)
//   }
// })
const onClose = () => {
  isShow.value = false
  search.value = ''
  searchResult.value = []
  // searchSelectRef
}
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
</script>
<style lang="scss" scoped>
.header-search {
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0px;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
      padding-left: 0;
      padding-right: 0;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
