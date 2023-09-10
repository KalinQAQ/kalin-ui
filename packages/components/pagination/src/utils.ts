export function getCurrentPage(
  totalPage: number,
  pageIndex: number,
  pagerCount: number
) {
  // [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const totalPageArr = Array.from(Array(totalPage).keys())

  if (totalPage <= pagerCount) {
    // 页码太少，全部显示
    return totalPageArr.slice(2, totalPage)
  } else {
    // 计算中位数
    const mid = Math.ceil(pagerCount / 2)
    if (pageIndex <= mid) {
      // [0, 1, 2, 3, 4, 5, 6, 7, 8]
      // pageIndex = 3
      // [2, 3, 4, 5, 6]
      // 左边全显示
      return totalPageArr.slice(2, pagerCount)
    } else if (pageIndex >= totalPage - mid + 1) {
      // pageIndex = 6
      // [0, 1, 2, 3, 4, 5, 6, 7, 8]
      // 右边全显示
      return totalPageArr.slice(totalPage - pagerCount + 2, totalPage)
    } else {
      // 中间显示
      // pageIndex = 4
      // [2, 3, 4, 5, 6]
      return totalPageArr.slice(pageIndex - mid + 2, pageIndex + mid - 1)
    }
  }
}
