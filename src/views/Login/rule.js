export const passwordValidate = () => {
  return (rule, value, callback) => {
    // 获取输入的值做验证
    if (value.length < 6) {
      callback(new Error('必须填六位数字'))
    } else {
      callback()
    }
  }
}
