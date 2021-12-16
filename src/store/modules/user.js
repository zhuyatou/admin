import { login, getUserInfo } from '@/api/user.js'
import md5 from 'md5'
import * as utils from '@/utils/storage.js'
import { TOKEN } from '@/common/common.js'
import router, { clearPrivateRoutes } from '@/router/index.js'
import { setTimeStamp } from '@/utils/auth.js'

const state = {
  token: utils.getItem(TOKEN) || '',
  // userInfo: utils.getItem(USER_INFO) || {},
  userInfo: {}
}
const getters = {}
const mutations = {
  setToken(state, token) {
    // 保存到vuex
    state.token = token
    // 保存到本地存储中
    utils.setItem(TOKEN, token)
  },
  setUserInfo(state, userInfo) {
    // 保存到vuex
    state.userInfo = userInfo
    // 保存到本地存储中
    // utils.setItem(USER_INFO, userInfo)
  }
}
const actions = {
  login({ commit }, info) {
    // 获取账号密码的信息
    const { username, password } = info
    return new Promise((resolve, reject) => {
      login({
        username,
        password: md5(password)
      })
        .then((res) => {
          // 保存token到vuex和本地存储中
          commit('setToken', res.token)
          // 记录token的获取时间
          setTimeStamp()
          resolve()
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  },
  logout(context) {
    // 清理用户数据
    context.commit('setToken', '')
    context.dispatch('roleAndPermission/clearRoleAndPermission', null, {
      root: true
    })
    // 清空当前该用户的动态路由
    clearPrivateRoutes()
    context.commit('setUserInfo', {})
    // 跳转到登录页面
    router.push('/login')
  },

  // 请求用户数据
  async getUserInfo({ commit }) {
    // 发送axios
    const res = await getUserInfo()
    commit('setUserInfo', res)
    return res
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
