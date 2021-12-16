<template>
  <ul class="context-menu-container">
    <li @click="refresh">{{ $t('msg.tagsView.refresh') }}</li>
    <li @click="closeRight">{{ $t('msg.tagsView.closeRight') }}</li>
    <li @click="closeOther">{{ $t('msg.tagsView.closeOther') }}</li>
  </ul>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { defineProps, defineEmits } from 'vue'
const router = useRouter()
const store = useStore()
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})
const refresh = () => {
  router.go(0)
}
const emits = defineEmits('closeTag')
const closeRight = () => {
  store.commit('tag/closeTag', {
    type: 'right',
    index: props.index
  })
  emits('closeTag')
}
const closeOther = () => {
  store.commit('tag/closeTag', {
    type: 'other',
    index: props.index
  })
  emits('closeTag')
}
</script>
<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 1000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
