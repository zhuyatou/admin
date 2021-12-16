import print from 'vue3-print-nb'
import showPermission from './permission.js'

export default (app) => {
  app.use(print)
  app.directive('showPermission', showPermission)
}
