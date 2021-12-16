<template>
  <div>
    <input type="text" v-focus />
    <div v-pos:left="num" class="d">xxx</div>
    <button @click="change">change--{{ num }}</button>
  </div>
</template>
<script>
/* eslint-disable */
import { ref } from 'vue'
export default {
  directives: {
    focus: {
      // 组件挂在完毕后自动聚焦
      mounted(el) {
        el.focus()
      }
    },
    pos: {
      mounted(el, binding) {
        el.style[binding.arg] = binding.value + 'px'
      },
      updated(el, binding) {
        el.style[binding.arg] = binding.value + 'px'
      }
    }
  },
  setup() {
    const num = ref(200)
    const change = () => {
      num.value = 400
    }
    return { num, change }
  }
}
</script>
<style lang="scss" scoped>
.d {
  position: absolute;
  width: 100px;
  height: 100px;
  background: red;
}
</style>
