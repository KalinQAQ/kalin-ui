import { ref } from 'vue'

export default function usePage(defaultPageIndex = 1) {
  // 页码
  // 上一页: 页码减一
  // 下一页: 页码加一
  // 点数字跳转相应页码
  // 点快速前往按钮，页码+5
  // 点快速后退按钮，页码-5
  const pageIndex = ref(defaultPageIndex)

  const setPageIndex = (cur: number) => {
    pageIndex.value = cur
  }

  const jumpPage = (page: number) => {
    pageIndex.value += page
  }

  const prePage = () => jumpPage(-1)
  const nextPage = () => jumpPage(1)

  return {
    pageIndex,
    setPageIndex,
    jumpPage,
    prePage,
    nextPage
  }
}
