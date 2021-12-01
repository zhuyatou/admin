import i18n from '../i18n/index'
import { watch } from 'vue'
import store from '@/store/index.js'
export const getTitle = (title) => {
  return i18n.global.t('msg.route.' + title)
}
export const watchLang = (...cbs) => {
  watch(
    () => {
      return store.getters.language
    },
    () => {
      cbs.forEach((cb) => {
        cb()
      })
    }
  )
}
