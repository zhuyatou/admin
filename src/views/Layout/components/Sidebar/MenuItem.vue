<template>
  <i :class="icon" v-if="icon.includes('el-icon')"></i>
  <!-- svg组件 -->
  <svg-icon :iconName="icon" className="sideClass" v-else />
  <span>{{ getTitle(title) }} </span>
</template>
<script setup>
import { getTitle } from '@/utils/i18n.js'
import { defineProps } from 'vue'
defineProps({
  title: {
    String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.sideClass {
  margin-right: 10px;
  margin-left: 3px;
}
</style>
