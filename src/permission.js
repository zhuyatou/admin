// 用户鉴权 路由守卫
import router from './router/index.js'
import store from './store/index.js'
const whiteRouter = ['/login']

// 进入每一个路由都会执行这个钩子
router.beforeEach(async (to, from, next) => {
  // if (to.matched.length === 0) {
  //   next('/404')
  // }
  /*
    用户鉴权
      当用户为登录时(没有token),只能进入login页面
      用户登录后,token未过期之前,不允许进入login页面
  */
  if (store.getters.token) {
    // 登录
    if (to.path === '/login') {
      // 不允许
      next('/')
    } else {
      // 登录成功 跳转到首页
      if (!store.getters.hasUserInfo) {
        // 判断没有用户的信息 就去发送axios
        const {
          permission: { menus }
        } = await store.dispatch('user/getUserInfo')
        // 1. 获取该用户所有的权限 然后动态添加路由到路由表中
        // 2. 根据权限比对私有路由 获取该用户能访问的路由
        const filterRoutes = await store.dispatch(
          'userPermission/filterPrivateRoutes',
          menus
        )
        // 3. 将获取到的路由动态添加到路由表中

        // router.addRoute(rou)
        filterRoutes.forEach((activeRoute) => {
          router.addRoute(activeRoute)
        })
        next(to.path)
      }
      // 首次登录后 跳转到首页
      next()
    }
  } else {
    if (whiteRouter.indexOf(to.path) > -1) {
      // 未登录
      next()
    } else {
      next('login')
    }
  }
})
