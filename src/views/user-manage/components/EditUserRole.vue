<template>
  <div>
    <el-dialog
      :model-value="isShowRoleDialog"
      :title="$t('msg.excel.roleDialogTitle')"
      @close="close"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="role in allRoles"
          :label="role.title"
          :key="role.id"
        />
      </el-checkbox-group>

      <template #footer>
        <el-button @click="close">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'
import { getRoleByUserid, updateRole } from '@/api/user-manage.js'
import { useStore } from 'vuex'
import { getAllRole } from '@/api/role.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const store = useStore()
const props = defineProps({
  isShowRoleDialog: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['close', 'update'])
const close = () => {
  emits('close')
}

const i18n = useI18n()
const confirm = async () => {
  // 修改用户角色
  const roles = checkList.value.map((title) =>
    allRoles.value.find((role) => role.title === title)
  )
  console.log(roles)
  const data = {
    userId: props.userId,
    roles: roles
  }
  await updateRole(data)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  emits('update')
  emits('close')
}

// 所有角色
const allRoles = ref(store.state.roleAndPermission.roles)

// 该用户默认角色
const checkList = ref([])

const getRole = async () => {
  const res = await getRoleByUserid(props.userId)
  checkList.value = res.role.map((item) => item.title)
}

const getAllRoles = async () => {
  const res = await getAllRole()
  allRoles.value = res
}

watch(
  () => props.userId,
  () => {
    // 获取用户角色
    getRole()
    if (Array.isArray(allRoles.value) && allRoles.value.length <= 0) {
      // 请求接口
      getAllRoles()
    }
  }
)
</script>
<style lang="scss" scoped></style>
