import i18n from '@/i18n/index.js'
import { watch } from 'vue'
import store from '@/store/index.js'
import { ElMessage } from 'element-plus'

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
        try {
          cb(store.getters.language)
        } catch (err) {
          setTimeout(() => {
            ElMessage.error('cbs 不符合校验规则')
          }, 100)
        }
      })
    }
  )
}
