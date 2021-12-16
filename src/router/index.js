import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/index.vue'

// 私有路由
/* eslint-disable */
// const privateRoutes = [
//   {
//     path: '/user',
//     component: () => import('@/views/layout/index.vue'),
//     redirect: '/user/manage',
//     meta: {
//       title: 'user',
//       icon: 'personnel'
//     },
//     children: [
//       {
//         path: '/user/manage',
//         component: () => import('@/views/user-manage/index'),
//         meta: {
//           title: 'userManage',
//           icon: 'personnel-manage'
//         }
//       },
//       {
//         path: '/user/role',
//         component: () => import('@/views/role-list/index'),
//         meta: {
//           title: 'roleList',
//           icon: 'role'
//         }
//       },
//       {
//         path: '/user/permission',
//         component: () => import('@/views/permission-list/index'),
//         meta: {
//           title: 'permissionList',
//           icon: 'permission'
//         }
//       },
//       {
//         path: '/user/info/:id',
//         name: 'userInfo',
//         component: () => import('@/views/user-info/index'),
//         meta: {
//           title: 'userInfo'
//         },
//         props: true
//       },
//       {
//         path: '/user/import',
//         name: 'import',
//         component: () => import('@/views/import/index'),
//         meta: {
//           title: 'excelImport'
//         }
//       }
//     ]
//   },
//   {
//     path: '/article',
//     component: () => import('@/views/layout/index.vue'),
//     redirect: '/article/ranking',
//     meta: {
//       title: 'article',
//       icon: 'article'
//     },
//     children: [
//       {
//         path: '/article/ranking',
//         component: () => import('@/views/article-ranking/index'),
//         meta: {
//           title: 'articleRanking',
//           icon: 'article-ranking'
//         }
//       },
//       {
//         path: '/article/:id',
//         component: () => import('@/views/article-detail/index'),
//         meta: {
//           title: 'articleDetail'
//         }
//       },
//       {
//         path: '/article/create',
//         component: () => import('@/views/article-create/index'),
//         meta: {
//           title: 'articleCreate',
//           icon: 'article-create'
//         }
//       },
//       {
//         path: '/article/editor/:id',
//         component: () => import('@/views/article-create/index'),
//         meta: {
//           title: 'articleEditor'
//         }
//       }
//     ]
//   }
// ]

// 公共路由 任何权限的用户都能访问
import Article from './modules/Article.js'
import ArticleCreate from './modules/ArticleCreate.js'
import PermissionList from './modules/PermissionList.js'
import RoleList from './modules/RoleList.js'
import UserManage from './modules/UserManage.js'
import store from '@/store/index.js'

export const PrivateRoutes = [
  Article,
  ArticleCreate,
  PermissionList,
  RoleList,
  UserManage
]

export const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...publicRoutes]
})

export const clearPrivateRoutes = () => {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((name) => {
      router.removeRoute(name)
    })
  }
}

export default router
