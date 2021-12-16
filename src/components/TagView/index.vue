<template>
  <div class="tags-view-container">
    <router-link
      v-for="(route, index) in store.getters.tagViewList"
      :key="route.fullPath"
      :to="{ path: route.fullPath }"
      class="tag-view-item"
      :class="isActive(route) ? 'active' : ''"
      :style="{
        backgroundColor: isActive(route) ? store.getters.cssVar.menuBg : '',
        borderColor: isActive(route) ? store.getters.cssVar.menuBg : ''
      }"
      @contextmenu.prevent.stop="showContextMenu($event, index)"
    >
      {{ route.title }}
      <!-- 渲染删除icon -->
      <i
        class="el-icon-close"
        v-if="!isActive(route)"
        @click.prevent.stop="closeCurrentTag(index)"
      ></i>
    </router-link>

    <!-- 操作菜单 -->
    <context-menu
      v-if="isShowContextMenu"
      :style="styleObj"
      :index="selectIndex"
      @closeTag="closeContextMenu"
    />
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import ContextMenu from './components/ContextMenu.vue'
import { ref, watch } from 'vue'

const store = useStore()
const route = useRoute()
// 是否激活
const isActive = (tag) => {
  return route.path === tag.path
}

const isShowContextMenu = ref(false)
const styleObj = ref({
  left: 0,
  top: 0
})
const selectIndex = ref(-1)
// 右击显示菜单
const router = useRouter()
const showContextMenu = (e, index) => {
  router.push({ path: store.getters.tagViewList[index].path })
  isShowContextMenu.value = true
  styleObj.value.top = '90 px'
  styleObj.value.left = e.x + 'px'
  selectIndex.value = index
}

// 关闭当前
const closeCurrentTag = (index) => {
  selectIndex.value = index
  store.commit('tag/closeTag', {
    type: 'index',
    index: selectIndex.value
  })
  closeContextMenu()
}

// 关闭
const closeContextMenu = () => {
  isShowContextMenu.value = false
}

// 点击body 关闭contextMenu
watch(isShowContextMenu, (newValue, oldValue) => {
  if (newValue) {
    document.addEventListener('click', closeContextMenu)
  } else {
    document.removeEventListener('click', closeContextMenu)
  }
})
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tag-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    border-radius: 3px;
    &,
    :first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }

    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &::before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
