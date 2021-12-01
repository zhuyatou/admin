import axios from 'axios'
import { colorMap, colorTables } from '../common/common'
import color from 'css-color-function'
import rgbHex from 'rgb-hex'

// 生成最终的样式

export const generateNewStyle = async (primary) => {
  if (!primary) return
  // 1获取所有的element样式
  const originalStyle = await getOriginalStyle()
  //  2分析原始样式 找出需要替换的颜色 做标记
  let newStyle = getStyleTemplate(originalStyle)
  // console.log(newStyle)
  // 3根据主色生成对应的情境色
  const newColors = generateColors(primary)
  console.log(newColors)
  // 4 在newstyle的模板中将标记都替换成生成的色值
  Object.keys(newColors).forEach((key) => {
    newStyle = newStyle.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + newColors[key]
    )
  })
  return newStyle
}
const getOriginalStyle = async () => {
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios.get(url)
  return data
}
const getStyleTemplate = (Style) => {
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    Style = Style.replace(new RegExp(key, 'gi'), value)
  })
  return Style
}
export const generateColors = (primary) => {
  // 根据主色生成对应的情景色
  const colors = {
    primary
  }
  Object.keys(colorTables).forEach((key) => {
    const value = colorTables[key].replace(new RegExp(/primary/g), primary)
    // 生成16进制的颜色
    colors[key] = '#' + rgbHex(color.convert(value))
    console.log(value)
  })
  return colors
}

// 将生成的样式写道head标签中
export const writeStyleToHearTag = (newStyle) => {
  const style = document.createElement('style')
  style.innerHTML = newStyle
  document.head.appendChild(style)
}
