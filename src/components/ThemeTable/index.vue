<template>
  <div>
    <el-card>
      <slot :headerStyleObj="headerStyleObj" />
    </el-card>
  </div>
</template>
<script setup>
import { ref, watch, defineProps } from 'vue'
import { useStore } from 'vuex'
import { watchLang } from '@/utils/i18n.js'

const store = useStore()

// 表头样式
const headerStyleObj = ref({
  background: store.getters.cssVar['light-3'],
  color: '#eee',
  fontWeight: 900
})

// 修改二级菜单的背景
const childrenBgColor = ref(store.getters.cssVar['light-6'])

// 修改hover状态的背景
const hoverBgColor = ref(store.getters.cssVar['light-3'])

const badgeColorHover = ref(store.getters.cssVar['light-1'])
const badgeColor = ref(store.getters.cssVar['light-4'])

// 监听主题切换
watch(
  () => {
    return store.getters.cssVar
  },
  () => {
    childrenBgColor.value = store.getters.cssVar['light-6']
    hoverBgColor.value = store.getters.cssVar['light-3']
    headerStyleObj.value.background = store.getters.cssVar['light-3']
    badgeColorHover.value = store.getters.cssVar.primary
    badgeColor.value = store.getters.cssVar['light-4']
  }
)

// 公共业务
// 1.当语言切换的时候 需要重新调用表格数据初始化
const props = defineProps({
  cbs: {
    type: Array,
    valilDator: (cbs) => {
      // cbs必须是一个数组
      if (Array.isArray(cbs)) {
        // 数组中的每一个单元必须是一个函数
        return cbs.every((item) => typeof item === 'function')
      } else {
        throw new Error('@@@')
      }
    }
  }
})
watchLang(...props.cbs)
</script>
<style lang="scss" scoped>
:deep(.el-table__row--level-1 > td) {
  background: v-bind(childrenBgColor);
}
:deep(.el-table__body tr:hover > td) {
  background: v-bind(hoverBgColor) !important;
  color: #fff;
}
:deep(.el-badge__content.is-fixed) {
  top: 10px;
  background: v-bind(badgeColor);
  &:hover {
    background: v-bind(badgeColorHover);
  }
}
</style>
