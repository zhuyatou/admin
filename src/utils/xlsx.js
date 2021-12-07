import XLSX from 'xlsx'

// 获取表头（通用方式）
export const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

// 判断文件是否是一个excel文件
export const isExcel = (file) => {
  return /\.(xlsx|xls)$/.test(file.name)
}

export const isJs = (file) => {
  return /\.js$/.test(file.name)
}

// 解析excel数据
export const readFileAsExcel = (data) => {
  // 2-1-1.解析读取完毕后文件的数据(插件) data
  // 2-1-2.利用 xlsx 解析文件内容
  const wrokbook = XLSX.read(data, { type: 'array' })
  // 2-1-3.获取第一个表格(sheet)的名称
  const firstSheetName = wrokbook.SheetNames[0]
  // 2-1-4.读取第一个 sheet 的数据
  const firstSheetData = wrokbook.Sheets[firstSheetName]
  // 2-1-5.解析表头 数据
  const headers = getHeaderRow(firstSheetData)
  // 2-1-6.解析表体 数据
  const bodys = XLSX.utils.sheet_to_json(firstSheetData)
  return { headers, bodys }
}

//  解析 excel 导入的时间格式
export const formatDate = (numb) => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  )
}
