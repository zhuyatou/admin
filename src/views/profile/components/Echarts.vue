<template>
  <el-col :xs="24" :sm="12" :span="12" class="clo">
    <!-- 就直接使用这个模板就行 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="title">{{ data.titles }}</span>
          <el-button class="button text" type="text">了解更多</el-button>
        </div>
      </template>
      <!-- 这里一个 div 包着一个echarts容器 id 为main -->
      <div class="echarts-box">
        <!-- 为 ECharts 准备一个定义了宽高的 DOM 给你看一下 ，这样就不会重复了-->
        <div :id="`main${index}`" style="width: 100%; height: 100%"></div>
      </div>
    </el-card>
  </el-col>
</template>
<script setup>
import { onMounted, defineProps } from '@vue/runtime-core'
import * as echarts from 'echarts'

// 父组件传的props参数
const props = defineProps({
  data: {
    // 对象类型 必传
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true // 必传
  }
})
console.log(props.data, '当前数据')
// 先测试一下 ,这里需要获取DOM 所以要在 onMounted页面挂载完成获取
onMounted(() => {
  // 初始化挂载 echarts
  const myChart = echarts.init(document.getElementById(`main${props.index}`))
  myChart.setOption(props.data) // 这里就要放入当前的数据了
  // 监听窗口大小事件
  // 给 window 上绑定一个 onresize 事件，监听窗口的改变
  window.addEventListener('resize', () => {
    // 调用echarts身上的resize方法（适应屏幕大小）
    window.onresize = myChart.resize()
  })
})
</script>
// lang 设置语言类型 scoped 设置当前样式的作用域
<style lang="scss" scoped>
.clo {
  margin-bottom: 20px;
}
.box-card {
  width: 100%;
  height: 100%;
}
.echarts-box {
  height: 300px;
}
.text {
  float: right;
}
.title {
  font-size: 20px;
  font-weight: 800;
}
</style>
// 安装完 Echarts 在项目中引入 Echarts //
