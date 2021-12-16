import * as local from './storage.js'
import { TIME_STAMP, TIME_OUT } from '@/common/common.js'

// 设置token时间
export const setTimeStamp = () => {
  // 保存时间
  local.setItem(TIME_STAMP, Date.now)
}

// 获取保存的token时间
const getTimeStamp = () => {
  return local.getItem(TIME_STAMP)
}
// 检测token时间是否超时 true没过期 false过期
export const isCheckTimeOut = () => {
  // 现在的时间 - 保存的shijian  > 2小时
  const currentTime = Date.now()
  /* eslint-disable-next-line */
  const time_stamp = getTimeStamp()
  /* eslint-disable-next-line */
  return currentTime - time_stamp <= TIME_OUT
}
