<template>
  <!-- 菜单 -->
  <el-menu
    :background-color="store.getters.cssVar.menuBg"
    :text-color="store.getters.cssVar.menuText"
    :active-text-color="store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    :default-active="activePath"
    :router="true"
    :collapse='!store.getters.sideBarOpen'
  >
    <!-- 子菜单1xiaoshi 16fen -->

    <sidebar-item v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/router.js'
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
// 获取路由
console.log(router.getRoutes())
// 去重
console.log(filterRouters(router.getRoutes()))
console.log(generateMenus(filterRouters(router.getRoutes())))
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
const route = useRoute()
// console.log(route)
const activePath = computed(() => {
  const { path } = route
  return path
})
console.log(routes.value)
</script>
<style lang="scss" scoped></style>
