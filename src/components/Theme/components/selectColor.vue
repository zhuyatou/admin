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
      <el-color-picker v-model="color" :predefine="predefineColors" />
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

// 关闭模态框
const emits = defineEmits(['closeDialog'])
const handleClose = () => {
  // 触发一个自定义事件 closeDialog
  emits('closeDialog')
}

// 取色器选中的颜色(主题色) 刷新不能丢失,其他地方需要使用主题色,所以要放到vuex和localStorage
const color = ref(store.getters.theme_color)

// 预定义颜色
// const predefineColor = [...predefineColors]

// 确认切换按钮
const confirm = async () => {
  console.log(color.value)
  // 1.保存主题色
  store.commit('theme/setMyColor', color.value)
  // 2.替换element和本地的样式 让主题色生效
  /*
      1.获取所有element的样式
      2.将样式中的情景颜色替换成 color.value
        color作为基本色生成一系列的和他相近的请景色
      3.将替换完的样式插入到html的header中,利用css的优先级让插入的样式生效
    */
  // 2-1 生成最终要替换的颜色
  const data = await generateNewStyle(color.value)
  // 2-2 将替换完的样式插入到header中,利用css的优先级让插入的样式生效
  writeStyleToHearTag(data)

  // 3.关闭dialog(取色器)
  emits('closeDialog')
}
</script>
<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
