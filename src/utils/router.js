/* eslint-disable */
import path from 'path'
import i18n from '@/i18n/index.js'
/**
 * 返回所有子路由
 */
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
/**
 * 查重去除子路由
 */
export const filterRouters = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export function generateMenus(routes, basePath = '') {
  const result = []
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
/*
配合fuse.js 处理路由数据源 满足fuse.js 的搜索方式
@param routes 是filter过滤去重以后的路由
*/

export const generateFuse = (routes, titles = []) => {
  let res = []
  // 遍历routers
  for (const route of routes) {
    const data = {
      path: route.path,
      title: [...titles] // 不迭代的话这里是个空title 如迭代 这里就是以后的一级标题的title
    }
    // 条件1.具备meta && meta.title 2.过滤掉动态路由 /:id
    const reg = /.*\/:.*/
    if (route.meta && route.meta.title && !reg.exec(route.path)) {
      // 变成国际化
      data.title = [...data.title,route.meta.title]
      res.push(data)
    }
    if(route.children && route.children.length >0){
      const subRes = generateFuse(route.children,data.title)
      if (subRes.length>0){
         res = [...res,...subRes]
      }
     
    }
    
  }

  return res
}
