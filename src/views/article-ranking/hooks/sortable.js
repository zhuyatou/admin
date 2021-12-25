import Sortable from 'sortablejs'
import { ref } from 'vue'
import { updateArticleRanking } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n/index.js'

export const tableRef = ref(null)
// 初始化插件
export const initSortable = (tableData, cb) => {
  const els = tableRef.value.$el.querySelectorAll(
    '.el-table__body-wrapper > table > tbody'
  ) // 拖拽行为触发的dom区域
  Sortable.create(els[0], {
    ghostClass: 'ghost',
    async onEnd(event) {
      const { oldIndex, newIndex } = event
      // 拖拽结束后 发送请求
      const finalRanking = tableData.value[newIndex].ranking
      const initRanking = tableData.value[oldIndex].ranking
      await updateArticleRanking({
        initRanking,
        finalRanking
      })
      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))
      tableData.value = []
      // 重新请求数据接口
      cb && cb()
    }
  })
}
