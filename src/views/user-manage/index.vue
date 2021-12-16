<template>
  <div class="user-manage-container">
    <el-card class="header">
      <!-- excel按钮 -->
      <el-button
        type="primary"
        @click="onImportExcel"
        v-showPermission="'importUser'"
      >
        {{ $t('msg.excel.importExcel') }}
      </el-button>
      <el-button type="success" @click="onExportExcel">{{
        $t('msg.excel.exportExcel')
      }}</el-button>
    </el-card>

    <el-card>
      <!-- table -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          label="#"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.excel.name')"
          prop="username"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.excel.mobile')"
          prop="mobile"
          align="center"
        ></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
              class="avatar"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')" align="center">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag
                style="margin-left: 10px"
                v-for="tag in row.role"
                :key="tag.id"
                size="mini"
                >{{ tag.title }}</el-tag
              >
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.openTime')"
          align="center"
          prop="openTime"
        >
          <template #default="{ row }">{{
            $filters.dateFilter(row.openTime)
          }}</template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          width="300px"
          align="center"
        >
          <template #default="{ row }">
            <el-button
              size="mini"
              type="success"
              @click="showUserDetail(row)"
              >{{ $t('msg.excel.show') }}</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="showRole(row)"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <el-button
              v-showPermission="'removeUser'"
              size="mini"
              type="warning"
              @click="removeData(row)"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- pagenation -->
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- excel 导出 模态框 -->
    <export-excel
      :dialogShow="dialogShow"
      @closeDialog="close"
      :exportData="exportData"
      :data="dataFormate(exportData)"
      :header="Object.keys(USER_RELATION)"
      :filename="filename"
      message="下载成功"
    >
      <!-- 插槽 选择下载的文件类型 -->
      <el-select
        v-model="exportType"
        placeholder="Select"
        class="sel"
        @change="changeExportType"
      >
        <el-option :key="1" label="当前页" :value="1"> </el-option>
        <el-option :key="2" label="全部数据" :value="2"> </el-option>
      </el-select>
    </export-excel>

    <!-- 用户修改角色模态框 -->
    <edit-role
      :isShowRoleDialog="isShowRoleDialog"
      :userId="userId"
      @close="closeRoleDialog"
      @update="getManageUser"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUser, getAllUser, deleteUserById } from '@/api/user-manage.js'
import ExportExcel from '@/components/ExportExcel/index.vue'
import { USER_RELATION } from '@/common/common.js'
import dateFilter from '@/filters/dataFilter.js'
import { useI18n } from 'vue-i18n'
import { watchLang } from '@/utils/i18n.js'
import { ElMessageBox, ElMessage } from 'element-plus'
import EditRole from './components/EditUserRole.vue'

// 角色相关
const isShowRoleDialog = ref(false)
const userId = ref('')
const showRole = (row) => {
  userId.value = row._id
  isShowRoleDialog.value = true
}
const closeRoleDialog = () => {
  isShowRoleDialog.value = false
}

// excel 相关数据定义
const i18n = useI18n()
const filename = ref(i18n.t('msg.excel.defaultName'))
const router = useRouter()
const exportType = ref(1)
const exportData = ref([])

// 表格相关数据
const tableData = ref([])

// 分页相关数据定义
const size = ref(5)
const page = ref(1)
const total = ref(0)

// 初始化用户数据
const getManageUser = async () => {
  const data = await getUser({
    page: page.value,
    size: size.value
  })
  tableData.value = exportData.value = data.list
  total.value = data.total
}
getManageUser()

// 跳转到导入页面
const onImportExcel = () => {
  router.push({ path: '/user/import' })
}

// 导出业务相关
const dialogShow = ref(false)
// 点击打开模态框
const onExportExcel = () => {
  dialogShow.value = true
  changeExportType(1)
}
// 监听关闭模态框
const close = () => {
  dialogShow.value = false
  exportType.value = 1
}

// 改变页大小
const sizeChange = (currentSize) => {
  size.value = currentSize
  getManageUser()
}
// 改变当前页码
const currentChange = (currentPage) => {
  page.value = currentPage
  getManageUser()
}

// 切换下载数据文件的类型
const changeExportType = async (value) => {
  if (value === 1) {
    // 下载当前页
    filename.value = `${i18n.t('msg.excel.defaultName')}(${page.value})`
  } else {
    // 下载全部数据
    const { list } = await getAllUser()
    exportData.value = list
    filename.value = i18n.t('msg.excel.defaultName')
  }
}

// 转化数据格式
const dataFormate = (data) => {
  return data.map((item) => {
    return Object.keys(USER_RELATION).map((key) => {
      // 处理用户角色
      if (USER_RELATION[key] === 'role') {
        const roles = item[USER_RELATION[key]]
        if (roles.length > 0) {
          return JSON.stringify(roles.map((role) => role.title))
        } else {
          return '[]'
        }
      } else if (USER_RELATION[key] === 'openTime') {
        // 处理时间
        return dateFilter(item[USER_RELATION[key]])
      } else {
        return item[USER_RELATION[key]]
      }
    })
  })
}

// 删除用户
const removeData = (row) => {
  ElMessageBox.confirm(
    `${i18n.t('msg.excel.dialogTitle1')} "${row.username}" ${i18n.t(
      'msg.excel.dialogTitle2'
    )}`,
    i18n.t('msg.excel.remove'),
    {
      confirmButtonText: i18n.t('msg.excel.remove'),
      cancelButtonText: i18n.t('msg.excel.close'),
      type: 'warning'
    }
  ).then(async (res) => {
    await deleteUserById(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    getManageUser()
  })
}

// 跳转详情
const showUserDetail = (row) => {
  router.push({ path: '/user/info/' + row._id })
}

// 监听语言变化
watchLang(
  (lang) => {
    filename.value = i18n.t('msg.excel.defaultName')
  },
  () => {
    getManageUser()
  }
)
</script>

<style lang="scss" scoped>
.header {
  text-align: right;
  margin-bottom: 22px;
}
.pagination {
  text-align: center;
  margin-top: 20px;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.sel {
  margin-top: 20px;
  width: 100%;
}
</style>
