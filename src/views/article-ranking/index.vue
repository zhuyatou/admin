<template>
  <div>
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">
          {{ $t('msg.article.dynamicTitle') }}
        </span>
        <el-checkbox-group v-model="selectDynamicLabel" :min="2">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :label="item.label"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <theme-table :cbs="[]">
        <template #default="headerStyleObj">
          <el-table
            border
            :header-cell-style="headerStyleObj"
            :data="tableData"
            ref="tableRef"
          >
            <el-table-column
              v-for="(item, index) in tableLabels"
              :key="index"
              :label="item.label"
              :prop="item.prop"
              :show-overflow-tooltip="true"
            >
              <template #default="{ row }" v-if="item.prop === 'publicDate'">
                {{ $filters.relativeTime(row.publicDate) }}
              </template>
              <template #default="{ row }" v-else-if="item.prop === 'action'">
                <el-button
                  type="primary"
                  size="mini"
                  @click="showActicle(row)"
                  >{{ $t('msg.article.show') }}</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="removeActicle(row)"
                  >{{ $t('msg.article.remove') }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </theme-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="pageChange"
        :current_page="page"
        :page-size="size"
        :page-sizes="[5, 10, 20, 50]"
        :total="total"
        layout="total,sizes,prev,pager,next,jumper"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { getArticleList, removeArticleById } from '@/api/article.js'
import ThemeTable from '@/components/ThemeTable/index.vue'
import { watchLang } from '@/utils/i18n.js'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

// -----------------动态列业务---------------
import { selectDynamicLabel, dynamicData, tableLabels } from './hooks/dynamic'
// -----------------拖拽列业务---------------
import { tableRef, initSortable } from './hooks/sortable'
onMounted(() => {
  initSortable(tableData, getArticle)
})

// -----------------表格基础渲染---------------

// 分页相关
const page = ref(1)
const size = ref(5)
const total = ref(0)
// 改变当前页
const pageChange = (page_) => {
  page.value = page_
  getArticle()
}
// 改变页大小
const sizeChange = (size_) => {
  size.value = size_
  getArticle()
}
const tableData = ref([])
const getArticle = async () => {
  const data = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = data.list
  total.value = data.total
}
getArticle()
// 查看详情
const router = useRouter()
const showActicle = (row) => {
  router.push('/article/' + row._id)
}
// 删除文章
const i18n = useI18n()
const removeActicle = (row) => {
  ElMessageBox.confirm(
    `${i18n.t('msg.article.dialogTitle1')} ${row.title} ${i18n.t(
      'msg.article.dialogTitle2'
    )} `,
    'warning'
  ).then(async (res) => {
    await removeArticleById(row._id)
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
    getArticle()
  })
}
// 进入组件 keep-alive onActivated
onActivated(getArticle)

// 语言切换
watchLang(getArticle)
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;
  .dynamic-box {
    display: flex;
    align-items: center;
    .title {
      margin-right: 20px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
