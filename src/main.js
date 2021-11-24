import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 引入样式的主入口文件
import './styles/index.scss'
// 加载svg的处理
// import './icons/index.js'
// 引入svg函数
import initSvgicon from './icons/index.js'

// 用户鉴权
import './permission.js'

const app = createApp(App)
installElementPlus(app)
// svg全局注册组件
initSvgicon(app)

app.use(store).use(router)
app.mount('#app')
/*eslint-disable*/
// 入口main.js（导入模块，js模块） -->webpack 处口/js/app.js文件
// 【css.文件 . 直接使用 .因为项目环境已经直接配置了常规的loader
/*
  svg 导入后
  1.是由file-loader变成一个/img/user.8.d03032.svg js模块
  2.可以按照img方式加载
     缺点：file-loader 转化的js模块不能动态修改一个图片的颜色不
      利于封装一个全局组件
*/

/*
  查看webket的默认设置??
  vue inspect 查看默认的webpack配置
  vue inspect --rules 查看所有的loader
  vue inspect --rule  svg


  如何配置webpack
  1.项目根目录创建
*/
