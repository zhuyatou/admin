import axios from '@/utils/request.js'

// 获取用户列表数据 post-->data:{}   get-->params:{}
export const getUser = (data) => {
  return axios.request({
    url: '/user-manage/list',
    method: 'GET',
    params: data
  })
}

// excel批量插入
export const addUserByExcel = (data) => {
  return axios.request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

// 获取所有数据
export const getAllUser = () => {
  return axios.request({
    url: '/user-manage/all-list',
    method: 'GET'
  })
}

// 删除用户
export const deleteUserById = (id) => {
  return axios.request({
    url: '/user-manage/detele/' + id,
    method: 'GET'
  })
}

// 用户详情
export const userDetailById = (id) => {
  return axios.request({
    url: '/user-manage/detail/' + id,
    method: 'GET'
  })
}

// 获取该用户的默认角色
export const getRoleByUserid = (userId) => {
  return axios.request({
    url: '/user-manage/role/' + userId,
    method: 'GET'
  })
}

// 修改用户角色
export const updateRole = (data) => {
  return axios.request({
    url: '/user-manage/update-role/' + data.userId,
    method: 'POST',
    data: {
      roles: data.roles
    }
  })
}
