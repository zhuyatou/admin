<template>
  <div>
    <div class="">个人中心</div>
    <p>{{ $t('msg.login.title') }}</p>
    <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    >
    </el-pagination>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
