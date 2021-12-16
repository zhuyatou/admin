import axios from '@/utils/request.js'

export const getAllPermission = (data) => {
  return axios.request({
    url: '/permission/list',
    method: 'GET'
  })
}
