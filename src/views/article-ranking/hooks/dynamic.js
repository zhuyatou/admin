import { ref, watch } from 'vue'
import { watchLang } from '@/utils/i18n.js'

// 所有的列数据 import 静态
import getDynamicData from './dynamicData.js'

export const dynamicData = ref(getDynamicData())

export const selectDynamicLabel = ref()

// 默认勾选所有的列
const initSelectDynmicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynmicLabel()

// 监听切换语言
watchLang(() => {
  dynamicData.value = getDynamicData()
  initSelectDynmicLabel()
})

// 表格的列数据
export const tableLabels = ref([])

// 监听选择的列
watch(
  selectDynamicLabel,
  (val, old) => {
    // 执行表格列的渲染
    tableLabels.value = dynamicData.value.filter((item) =>
      val.includes(item.label)
    )
  },
  {
    immediate: true
  }
)
