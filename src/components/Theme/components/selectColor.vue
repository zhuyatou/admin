<template>
  <el-dialog
    :model-value="showDialogVariable"
    :title="$t('msg.theme.themeChange')"
    width="30%"
    @close="handleClose"
  >
    <!-- 取色器 -->
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker v-model="color" :predefine="predefineColor" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{
          $t('msg.universal.cancel')
        }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
import { predefineColors } from '@/common/common.js'
import { generateNewStyle, writeStyleToHearTag } from '@/utils/theme.js'
const store = useStore()
defineProps({
  showDialogVariable: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['closeDialog'])
// 关闭模态框
const handleClose = () => {
  // 触发一个自定义事件closeDialog
  emits('closeDialog')
}

// 切换按钮
const confirm = async () => {
  console.log(color.value)
  // 1.保存颜色
  store.commit('theme/setMyColor', color.value)
  // 2.替换 element和本地的样式 让主题色生效
  // 2-1 生成最终要替换的颜色
  const newStyle = await generateNewStyle(color.value)
  // console.log(newStyle)
  // 2-2将替换完的样式 插入到header中，利用css的优先级让插入的样式生效
  writeStyleToHearTag(newStyle)
  // 3.关闭dialog
  emits('closeDialog')
}
// 取色器选中的颜色 主题颜色 刷新不能掉 其他地方需要使用主题色  vuex localstorage
const color = ref(store.getters.theme_color)
// 定义预定颜色
const predefineColor = [...predefineColors]
</script>
<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
