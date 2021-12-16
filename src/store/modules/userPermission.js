import { publicRoutes, PrivateRoutes } from '@/router/index.js'

export default {
  namespaced: true,
  state: {
    // 用户的所有路由表 public + private
    routes: publicRoutes
  },
  mutations: {
    setPrivateRoutes: (state, newPrivateRoutes) => {
      state.routes = [...publicRoutes, ...newPrivateRoutes]
    }
  },
  actions: {
    filterPrivateRoutes: ({ commit }, menus) => {
      const routes_ = []
      // 过滤
      menus.forEach((name) => {
        routes_.push(...PrivateRoutes.filter((item) => item.name === name))
      })
      // 如果匹配不存在的路由统一加载 /404
      // routes_.push({
      //   path: '/:pathMatch(.*)',
      //   redirect: '/404'
      // })
      commit('setPrivateRoutes', routes_)
      return routes_
    }
  }
}
