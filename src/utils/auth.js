import * as local from './storage.js'
import { TIME_STAMP, TIME_OUT } from '../common/common.js'

export const setTimeStamp = () => {
  // 保存时间
  local.setItem(TIME_STAMP, Date.now())
}
// 获取保存token时间
const getTimeStamp = () => {
  return local.getItem(TIME_STAMP)
}
// check时间超时  若返回true 是不过期 false则时间过期
export const isCheckTimeOut = () => {
  // 现在的时间-保存的时间>2 小时

  const currentTime = Date.now()
  // eslint-disable-next-line
  const time_stamp = getTimeStamp()
  // eslint-disable-next-line
  return currentTime - time_stamp <= TIME_OUT
}
