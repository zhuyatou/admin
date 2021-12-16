import axios from '@/utils/request.js'

// 获取所有的角色列表
export const getAllRole = () => {
  return axios.request({
    url: '/role/list',
    method: 'GET'
  })
}

// 获取该角色的权限
export const getPermissionByRoleId = (roleId) => {
  return axios.request({
    url: 'role/permission/' + roleId,
    method: 'GET'
  })
}

// 修改角色的权限
export const updatePermissionByRoleId = ({ permissions, roleId }) => {
  return axios.request({
    url: 'role/distribute-permission',
    method: 'POST',
    data: {
      permissions,
      roleId
    }
  })
}
