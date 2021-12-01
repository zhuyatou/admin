import { createStore } from 'vuex'
import user from './modules/user.js'
import getters from './modules/getters'
import app from './modules/app'
import theme from './modules/theme.js'
import tag from './modules/tag.js'

export default createStore({
  getters,
  modules: {
    user,
    app,
    theme,
    tag
  }
})
