import layout from '@/views/layout/index.vue'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleCreate',
  meta: { title: 'article', icon: 'article' },
  children: [
    {
      path: '/article/create/:id', // 参数占位符
      // 就是在当前路由中配置 props属性为 true,然后路由跳转接收到的参数可以以 props 接收，我给你演示
      component: () => import('@/views/article-create/index'),
      props: true, // 布尔模式
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      component: () => import('@/views/article-create/index'),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
