import { login, getUserInfo } from '@/api/user.js'
import md5 from 'md5'
import * as utils from '@/utils/storage.js'
import { TOKEN, USER_INFO } from '@/common/common.js'
import router from '@/router/index.js'
import { setTimeStamp } from '../../utils/auth'

const state = {
  token: utils.getItem(TOKEN) || '',
  userInfo: utils.getItem(USER_INFO) || {}
}
const getters = {}
const mutations = {
  setToken(state, token) {
    //  保存vuex
    state.token = token
    // 保存到本地存储中
    utils.setItem(TOKEN, token)
  },
  setUserInfo(state, userInfo) {
    //  保存vuex
    state.userInfo = userInfo
    // 保存到本地存储中
    utils.setItem(USER_INFO, userInfo)
  }
}
const actions = {
  login({ commit }, info) {
    // 获取账号密码信息
    const { username, password } = info
    return new Promise((resolve, reject) => {
      login({
        username,
        password: md5(password)
      })
        .then((res) => {
          // 保存token到vuex和本地存储
          commit('setToken', res.token)
          // 记录tiken的获取时间
          setTimeStamp()
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    // 清理用户数据
    commit('setToken', '')
    commit('userInfo', {})
    // 跳转到登录页
    router.push('./login')
  },
  // 请求用户数据
  getUserInfo({ commit }) {
    // 发送axios
    getUserInfo()
      .then((res) => {
        commit('setUserInfo', res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
