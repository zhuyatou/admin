<template>
  <div>
    <svg-icon
      :iconName="isScreenFull ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggleScreenFull"
      className="screenIcon"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'
const isScreenFull = ref(false)
const toggleScreenFull = () => {
  isScreenFull.value = !isScreenFull.value
  // 使用screenfull 插件完成 全屏切换
  screenfull.toggle()
}
</script>
<style lang="scss" scoped>
.screenIcon {
  fill: currentColor;
  color: #393735;
}
</style>
