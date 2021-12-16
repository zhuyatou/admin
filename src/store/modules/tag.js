import { setItem, getItem } from '@/utils/storage.js'
import { TAG_VIEWS } from '@/common/common.js'

export default {
  namespaced: true,
  state: {
    tagViewList: getItem(TAG_VIEWS) || []
  },
  mutations: {
    addTagViewList(state, route) {
      // 不存在才添加
      const isFind = state.tagViewList.find((item) => item.path === route.path)
      if (!isFind) {
        state.tagViewList.push(route)
        setItem(TAG_VIEWS, state.tagViewList)
      }
    },

    // 更新 tagViewList 中的指定索引的 title
    changeTitle(state, tagViewList) {
      state.tagViewList = tagViewList
      setItem(TAG_VIEWS, state.tagViewList)
    },

    /*
      关闭业务
      params:paylod:{type:"index||other||right",index:index}
    */
    closeTag(state, paylod) {
      if (paylod.type === 'index') {
        // 关闭当前
        state.tagViewList.splice(paylod.index, 1)
      } else if (paylod.type === 'other') {
        // 关闭其他
        state.tagViewList = [state.tagViewList[paylod.index]]
      } else if (paylod.type === 'right') {
        // 关闭右侧
        state.tagViewList.splice(paylod.index + 1, state.tagViewList.length - 1)
      }
      setItem(TAG_VIEWS, state.tagViewList)
    }
  }
}
