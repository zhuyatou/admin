<template>
  <div>
    <el-row :gutter="20">
      <!-- 把这里封装成一个组件，遍历组件展示就行了-->
      <!-- 这里 把当前 index 作为 key值 把当前这条数据传给子组件 -->
      <Echarts
        v-for="(item, index) in echartsData"
        :key="index"
        :data="item"
        :index="index"
      />
    </el-row>
  </div>
</template>
<script setup>
// 导入自己封装的Echarts组件
import Echarts from './components/Echarts.vue'
// 引入 echarts数据，到时候工作，数据是从后台来的
import echartsData from './data/echartsData'
</script>
<style></style>
// 这里要使用 layout 布局容器
