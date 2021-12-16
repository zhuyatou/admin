<template>
  <div
    class="app-wrapper"
    :class="store.getters.sideBarOpen ? '' : 'hideSidebar'"
  >
    <!-- 左边 -->
    <side-bar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: store.getters.cssVar.menuBg }"
    />
    <!-- 右边 -->
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar />
        <!-- tag view -->
        <tag-view />
      </div>
      <app-main class="appmain" />
    </div>
  </div>
</template>
<script setup>
import SideBar from './components/Sidebar'
import NavBar from './components/Navbar'
import AppMain from './components/AppMain'
import { useStore } from 'vuex'
import TagView from '@/components/TagView/index.vue'

const store = useStore()
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .sidebar-container {
    width: $sideBarWidth;
    height: 100vh;
  }
}
.fixed-header {
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 10;
  width: calc(100% - #{$sideBarWidth}); // 用来动态计算宽度的
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$sideBarhideWidth});
  transition: width 0.28s;
}
.appmain {
  margin-top: 34px;
}
</style>
