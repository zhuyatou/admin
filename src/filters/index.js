import dateFilter from './dataFilter'

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
