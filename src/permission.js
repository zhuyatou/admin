//  用户鉴权 路由守卫
import router from './router/index.js'
import store from './store/index.js'
const whiteRouter = ['/login']
// 进入每一个路由都会执行 这个钩子
router.beforeEach(async (to, from, next) => {
  // 当用户未登陆时（没有token），只能进入login页面
  // 用户登陆后  token未过期前不允许进入login页面
  if (store.getters.token) {
    if (to.path === '/login') {
      // 不允许
      next('/')
    } else {
      // 登陆成功 跳转到首页
      if (!store.getters.hasUserInfo) {
        // 判断没有用户的信息就去发送axios
        // setTimeout(async()=>{
        //    await store.dispatch('user/getUserInfo')
        //   next()
        // },70000)
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
    // 未登录
  } else {
    if (whiteRouter.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
