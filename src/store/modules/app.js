import { getItem, setItem } from '@/utils/storage.js'
import { LANGUAGE } from '@/common/common.js'

const state = {
  sideBarOpened: true,
  language: getItem(LANGUAGE) || ''
}
const mutations = {
  toggleSideBar(state) {
    state.sideBarOpened = !state.sideBarOpened
  },
  setLanguage(state, lang) {
    setItem(LANGUAGE, lang)
    state.language = lang
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
