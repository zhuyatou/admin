<template>
  <div class="article-detail-container">
    <h2 class="title">{{ detailData.title }}</h2>
    <div class="header">
      <!-- 作者 -->
      <span class="author">{{
        $t('msg.article.author') + ':' + detailData.author
      }}</span>
      <!-- 时间 -->
      <span class="time">{{
        $t('msg.article.publicDate') +
        ':' +
        $filters.relativeTime(detailData.publicDate)
      }}</span>
      <!-- 编辑按钮 -->
      <el-button type="text" class="edit" @click="editArticle">{{
        $t('msg.article.edit')
      }}</el-button>
    </div>

    <!-- 内容 -->
    <div class="content" v-html="detailData.content"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articleDetail } from '@/api/article.js'

const route = useRoute()
const router = useRouter()

const detailData = ref({})
const getArticleDetail = async (id) => {
  detailData.value = await articleDetail(id)
}

watch(
  () => {
    return route.params.id
  },
  (val) => {
    if (val) {
      getArticleDetail(val)
    }
  },
  {
    immediate: true
  }
)

// 点击编辑文章内容
const editArticle = () => {
  // 执行路由跳转，到创建文章页面 把当前id传递过去,这是 params 传参，要在路由中配置占位符
  router.push('/article/create/' + route.params.id) // 跳转到 创建文章
}
</script>

<style lang="scss" scoped>
.article-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0;
    .author {
      font-size: 14px;
      color: #556665;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #4d4d4d;
  }
}
</style>
