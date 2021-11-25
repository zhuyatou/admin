import i18n from '../i18n/index'

export const getTitle = (title) => {
  return i18n.global.t('msg.route.' + title)
}
