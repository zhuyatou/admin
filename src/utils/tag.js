const isNoTagArr = ['/login', '/404', '/401', '/import']

export const isNoTag = (path) => {
  return isNoTagArr.includes(path)
}
