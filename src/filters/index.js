import dateFilter from './dateFilter'

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
