import axios from '@/utils/request'

// 获取用户列表数据 post-->data:{} get--->params:{}
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

export const getAlluser = () => {
  return axios.request({
    url: '/user-manage/all-list',
    method: 'GET'
  })
}
