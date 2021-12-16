import store from '@/store/index.js'

const checkoutPermission = (el, binding) => {
  const value = binding.value
  const points = store.getters.userInfo.permission.points

  const index = points.findIndex((item) => item === value)
  console.log('####', index)
  if (index <= 0) {
    // 没有权限 删除该dom  父节点.removeChild(el)
    el.parentNode && el.parentNode.removeChild(el)
  }
}

export default {
  mounted(el, binding) {
    checkoutPermission(el, binding)
  },
  update(el, binding) {
    checkoutPermission(el, binding)
  }
}
