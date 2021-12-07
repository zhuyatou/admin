<template>
  <div class="upload-excel-container">
    <!-- 文件上传 -->
    <div class="btn-upload">
      <el-button type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>

      <!-- 文件上传的隐藏域 -->
      <input
        ref="tagUploadInput"
        type="file"
        class="upload-excel-input"
        :accept="accept[type]"
        @change="handleChange"
      />
    </div>
    <!-- 拖拽上传 -->
    <div
      class="drop"
      @drop.prevent.stop="onDrop"
      @dragenter.prevent.stop="onDropEnter"
      @dragover.prevent.stop="onDropOver"
    >
      <i class="el-icon-upload"></i>
      {{ $t('msg.uploadExcel.drop') }}
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import { isExcel, isJs, readFileAsExcel } from '@/utils/xlsx.js'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  beforeUpload: {
    type: Function,
    required: true
  },
  onSuccess: Function
})
const type = ref('')
const { type: fileType, doUpload } = props.beforeUpload()
if (fileType) {
  type.value = fileType
} else {
  ElMessage.error('必须设定对应的文件')
}

const accept = ref({ excel: '.xlsx,xls', js: '.js', txt: '.txt' })

// input 文件上传业务
const tagUploadInput = ref(null)
// 点击了文件上传按钮
const handleUpload = () => {
  // 触发input的点击事件
  tagUploadInput.value.click()
}

// 选择了文件
const handleChange = (e) => {
  // 获取到文件
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) {
    return false
  }
  // 上传文件
  upload(rawFile)
}

// 执行上传 如果存在beforeUpload 而且beforeUpload返回true才执行读取操作,如果没有beforeUpload直接执行读取操作
const upload = (rawFile) => {
  if (doUpload) {
    // 读取文件
    readFile(rawFile)
  } else {
    ElMessage.error('取消文件读取操作')
  }
}
// 读取文件
const readFile = (rawFile) => {
  // 1.创建读取对象
  const reader = new FileReader()
  // 2.读取完毕回调
  reader.onload = (event) => {
    // 2-1-1.获取读取完毕后的文件内容(excel文件格式)
    const data = event.target.result
    if (type.value === 'excel') {
      const result = readFileAsExcel(data)
      generateDate(result)
    } else if (type.value === 'js') {
      // 解析其他类型文件...
      console.log('解析js文件')
    }
    // 2-2.解析完毕后,调用onSuccess()
  }

  // 3.异步读取
  reader.readAsArrayBuffer(rawFile)
}

// 通知父组件解析完毕
const generateDate = (result) => {
  props.onSuccess(result)
}

// 拖拽文件上传业务
// 释放后会触发
const i18n = useI18n()
const onDrop = (e) => {
  // 获取文件的内容
  const files = e.dataTransfer.files
  if (files.length <= 0) {
    ElMessage.error('必须拖拽一个有效的文件!')
    return false
  }
  const rawFile = files[0]
  if (!checkFileType(rawFile)) {
    return false
  }
  upload(rawFile)
}

// 验证文件类型
const checkFileType = (rawFile) => {
  if (type.value === 'excel') {
    if (!isExcel(rawFile)) {
      ElMessage.error(
        rawFile.name + ':' + i18n.t('msg.excel.noExcelFile') + '!'
      )
      return false
    } else {
      return true
    }
  } else if (type.value === 'js') {
    if (!isJs(rawFile)) {
      ElMessage.error(rawFile.name + ':不是一个js文件!')
      return false
    } else {
      return true
    }
  }
}
// 将一个文件移动在可释放区域内就触发
const onDropEnter = (e) => {
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
}
</script>
<style lang="scss" scoped>
.upload-excel-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .upload-excel-input {
    display: none;
    z-index: -1000;
  }

  .btn-upload,
  .drop {
    border: 1px dashed #ddd;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }

  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
