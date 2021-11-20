<template>
  <div class="app-wrapper">
    <!-- 左侧边栏 -->
    <side-bar :style="{ backgroundColor: variables.subMenuBg }" />
    <!-- 右侧边栏 -->
    <div class="main-container">
      <div class="fixed-header">
        <Navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>
<script setup>
import SideBar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index'
import AppMain from './components/AppMain/index'
import variables from '@/styles/variables.scss'
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: absolute;
  height: 100%;
  width: 100%;
  .siderbar-container {
    width: $sideBarWidth;
    height: 100vh;
  }

  .main-container {
    .fixed-header {
      position: fixed;
      top: 0px;
      right: 0px;
      z-index: 10;
      width: cale(100% #{$sideBarWidth}); //动态计算宽度的
    }
  }
}
</style>
