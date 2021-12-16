<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
  <!-- 二级路由显示容器 -->
</template>
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { isNoTag } from '@/utils/tag.js'
import { getTitle as getTitle_, watchLang } from '@/utils/i18n.js'

// 获取title
const getTitle = (to) => {
  if (!to.meta || !to.meta.title) {
    // 如果不存在title
    const tmp = to.path.split('/')
    return tmp[tmp.length - 1]
  } else {
    // 如果存在title --> 以 path 的最后一项作为 title
    return getTitle_(to.meta.title)
  }
}

const route = useRoute()
const store = useStore()

// 监听当前路由变化 --> 添加 tag 到指定位置
watch(
  route,
  (to, from) => {
    if (isNoTag(to.path)) {
      return true
    }
    // 增加一个合法的 tag 到 vuex 中
    const { path, fullPath, meta, name, params, query } = to
    store.commit('tag/addTagViewList', {
      path,
      fullPath,
      meta,
      name,
      params,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)

// 当国际化切换
watchLang(() => {
  // 重新更新vuex中的title值
  const tmpArr = []
  store.getters.tagViewList.forEach((route) => {
    tmpArr.push({ ...route, title: getTitle(route) }) // 不能使用getTitle_(route.title)
  })
  store.commit('tag/changeTitle', tmpArr)
})
</script>
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
