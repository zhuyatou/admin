import dateFilter from './dataFilter'
import relativeTime from './relativeTime'

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
