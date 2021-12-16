<template>
  <div>
    <el-card class="toggle">
      <el-button type="primary" @click="toggle">{{
        isShowChildren
          ? $t('msg.role.toggleTitle2')
          : $t('msg.role.toggleTitle1')
      }}</el-button>
    </el-card>
    <e-card>
      <el-table
        ref="table"
        :data="permissionData"
        style="width: 100%; margin-bottom: 20px"
        border
        row-key="id"
        :default-expand-all="isShowChildren"
        :tree-props="{ children: 'children' }"
        :header-cell-style="{
          background: store.getters.cssVar['light-3'],
          color: '#eee',
          fontWeight: 900
        }"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
          width="200"
        ></el-table-column
        ><el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        ></el-table-column>
      </el-table>
    </e-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getAllPermission } from '@/api/permission.js'
import { useStore } from 'vuex'

const store = useStore()
const permissionData = ref([])

/*
  权限的分类
    [
      { --> 页面权限(一级) --> 1.能在左边的菜单看到这个选项 2.可以点击进入当前组件
        children:[
          {} --> 该页面中的操作权限(二级) --> 可以看到页面中的操作按钮,并点击执行对应的业务
        ]
      }
    ]
*/

const initPermission = async () => {
  const data = await getAllPermission()
  permissionData.value = data
  console.log(data)
}
initPermission()

// 全部展开和收起二级菜单
const isShowChildren = ref(false)
const table = ref(null)
const toggle = () => {
  isShowChildren.value = !isShowChildren.value
  permissionData.value.forEach((row) => {
    table.value.toggleRowExpansion(row, isShowChildren.value)
  })
}

// 修改二级菜单的背景
const childrenBgColor = ref(store.getters.cssVar['light-6'])

// 修改hover状态的背景
const hoverBgColor = ref(store.getters.cssVar['light-3'])

// 监听主题切换
watch(
  () => {
    return store.getters.cssVar
  },
  () => {
    childrenBgColor.value = store.getters.cssVar['light-6']
    hoverBgColor.value = store.getters.cssVar['light-3']
  }
)

// 如果语言切换了 重新请求接口
watch(
  () => {
    return store.getters.language
  },
  () => {
    initPermission()
  }
)
</script>

<style lang="scss" scoped>
:deep(.el-table__row--level-1 > td) {
  background: v-bind(childrenBgColor);
}
:deep(.el-table__body tr:hover > td) {
  background: v-bind(hoverBgColor) !important;
  color: #fff;
}
.toggle {
  text-align: right;
  margin-bottom: 20px;
}
</style>
