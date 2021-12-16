<template>
  <div>
    <theme-table :cbs="cbs">
      <template #default="{ headerStyleObj }">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="headerStyleObj"
          ref="table"
        >
          <!-- 展开行显示角色下面的权限 -->
          <el-table-column type="expand" label=">">
            <template #default="{ row }">
              <div class="tags">
                <el-tag
                  size="mini"
                  v-for="item in getAllPermissions_"
                  :key="item.id"
                  :class="isActive(item, row)"
                  >{{ item.title }}</el-tag
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('msg.role.index')"
            type="index"
            width="160"
          ></el-table-column>
          <el-table-column
            :label="$t('msg.role.name')"
            prop="title"
            width="200"
          ></el-table-column
          ><el-table-column
            :label="$t('msg.role.desc')"
            prop="describe"
          ></el-table-column>
          <el-table-column :label="$t('msg.role.action')">
            <template #default="{ row }">
              <el-badge
                type="primary"
                v-if="row.permissions && row.permissions.length >= 0"
                :value="row.permissions.length"
              >
                <el-button
                  type="primary"
                  size="mini"
                  @click="showeditPermission(row)"
                  >{{ $t('msg.role.assignPermissions') }}</el-button
                >
              </el-badge>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </theme-table>

    <!-- 角色修改权限 模态框 -->
    <edit-permission
      v-if="isShowDialog"
      :isShowDialog="isShowDialog"
      @close="isShowDialog = false"
      :roleId="selectRoleId"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ThemeTable from '@/components/ThemeTable/index.vue'
import EditPermission from './components/EditPermission.vue'
import { useStore } from 'vuex'

// 初始化角色列表
const tableData = ref([])
const store = useStore()
const getAllRoles = () => {
  // 获取所有的角色 roles
  store.dispatch('roleAndPermission/initRoles')

  // 获取所有的权限列表
  store.dispatch('roleAndPermission/initPermissions')
}
getAllRoles()

watch(
  () => {
    return store.state.roleAndPermission.roles
  },
  () => {
    tableData.value = store.state.roleAndPermission.roles
  },
  {
    immediate: true
  }
)

// 语言切换
const cbs = [
  () => {
    // 清空本地存储
    store.dispatch('roleAndPermission/clearRoleAndPermission')
  },
  getAllRoles
]

// 修改权限
const isShowDialog = ref(false)
const selectRoleId = ref('')
const selectRow = ref({})
const showeditPermission = (row) => {
  isShowDialog.value = true
  selectRoleId.value = row.id
  selectRow.value = row
}

// 获取所有的权限
const getAllPermissions_ = ref([])
watch(
  () => {
    return store.state.roleAndPermission.permissions_
  },
  () => {
    getAllPermissions_.value = store.state.roleAndPermission.permissions_
  },
  {
    immediate: true
  }
)

// 该权限是否选中
const isActive = (item, row) => {
  const index = row.permissions.findIndex((per) => item.id === per.id)
  if (index >= 0) {
    return ''
  } else {
    return 'no-active'
  }
}
</script>

<style lang="scss" scoped>
.tags {
  text-align: center;
  width: 100%;
  span {
    margin-left: 10px;
  }
  .no-active {
    background: red !important;
    color: #fff;
  }
}
</style>
