import { RangeOptions, VirtualOptions, updateType } from './props'

const enum CALC_TYPE {
  INIT = 'INIT',
  FIXED = 'FIXED',
  DYNAMIC = 'DYNAMIC'
}
export function initVirtual(param: VirtualOptions, update: updateType) {
  let offsetValue = 0 // 初始偏移量
  let caclType = CALC_TYPE.INIT
  let firstRangeAvg = 0
  let fixedSizeVal = 0 // 默认值是0
  const sizes = new Map<string | number, number>()
  const range: RangeOptions = {
    start: 0,
    end: 0,
    padFront: 0,
    padBehind: 0
  }
  function isFixed() {
    return caclType === CALC_TYPE.FIXED
  }
  function getEstimateSize() {
    // 优化平均值
    return isFixed() ? fixedSizeVal : firstRangeAvg || param.estimateSize
  }
  function getIndexOffset(idx: number) {
    if (!idx) return 0
    let offset = 0
    for (let i = 0; i < idx; i++) {
      const indexSize = sizes.get(param.uniqueIds[i])
      offset += typeof indexSize === 'number' ? indexSize : getEstimateSize()
    }
    return offset
  }
  function getPadFront() {
    // 准确计算上偏移量
    if (isFixed()) {
      return fixedSizeVal * range.start
    } else {
      // 将滚动后的元素累加一遍 计算上padding

      return getIndexOffset(range.start)
    }
  }
  function getPadBehind() {
    const lastIndex = param.uniqueIds.length - 1
    return (lastIndex - range.end) * getEstimateSize()
  }
  function updateRange(start: number, end: number) {
    range.start = start
    range.end = end
    range.padFront = getPadFront()
    range.padBehind = getPadBehind()
    // 调用回调函数
    update({ ...range })
  }
  function checkRange(start: number, end: number) {
    const total = param.uniqueIds.length // 所有的数据
    const keeps = param.keeps
    if (total < keeps) {
      start = 0
      end = total - 1
      // 最后滑动到了 100条 71-100
      // start = 90 - end = 100
    } else if (end - start < keeps - 1) {
      start = end - keeps + 1
    }
    updateRange(start, end)
  }
  function getScrollOvers() {
    // 根据划过的偏移量 / 每项的高度 就是划过的个数
    // getEstimateSize() 这个值是预估的，我们要精确的找到滚动了多少个
    if (isFixed()) {
      return Math.floor(offsetValue / getEstimateSize())
    } else {
      // 获取最接近的滚动的那一项，计算每一项的偏移量，看与哪一项最接近
      // 有序递增查找 -> 二分查找
      let low = 0
      let high = param.uniqueIds.length
      let middle = 0
      let middleOffset = 0

      while (low <= high) {
        // O(logn)
        middle = low + Math.floor((high - low) / 2)
        middleOffset = getIndexOffset(middle)
        if (middleOffset == offsetValue) {
          return middle
        } else if (middleOffset < offsetValue) {
          low = middle + 1
        } else if (middleOffset > offsetValue) {
          high = middle - 1
        }
      }
      // 12.5个
      return low > 0 ? --low : 0
    }
  }
  function getEndByStart(start: number) {
    const computedEnd = start + param.keeps - 1
    const end = Math.min(computedEnd, param.uniqueIds.length - 1)
    return end
  }
  function handleFront() {
    // 核心就是向上滑动要不要更新start
    // 获取划过了多少个
    const overs = getScrollOvers()

    if (overs > range.start) {
      // 现在从第三十个开始展示，展示30条，目前是40，滑倒了第35个
      return
    }
    // 划过了10个 但是开始是5
    const start = Math.max(overs - param.buffer, 0)
    checkRange(start, getEndByStart(start))
  }

  function handleBehind() {
    const overs = getScrollOvers()
    if (overs < range.start + param.buffer) {
      // 向下加载的时候是否在缓存区中
      return
    }
    checkRange(overs, getEndByStart(overs))
  }

  function handleScroll(offset: number) {
    // 先看一下是向上滚动还是向下滚动
    const direction = offset < offsetValue ? 'FRONT' : 'BEHIND'
    offsetValue = offset
    if (direction === 'FRONT') {
      handleFront()
    } else if (direction === 'BEHIND') {
      handleBehind()
    }
  }
  function saveSize(id: string | number, size: number) {
    sizes.set(id, size)

    if (caclType === CALC_TYPE.INIT) {
      // 第一个元素加载完毕后默认认为是固定高度
      fixedSizeVal = size
      caclType = CALC_TYPE.FIXED
    } else if (caclType === CALC_TYPE.FIXED && fixedSizeVal !== size) {
      caclType = CALC_TYPE.DYNAMIC
      fixedSizeVal = 0 // 默认采用estimateSize
    }

    // 尽可能不要采用 estimateSize 来进行操作
    // 有固定高度 、 动态高度

    if (caclType === CALC_TYPE.DYNAMIC) {
      // 根据已经加载的数据算一个平均值 来撑开滚动条
      // 根据当前展示的数据 来计算一个滚动条的值
      if (sizes.size < Math.min(param.keeps, param.uniqueIds.length)) {
        firstRangeAvg =
          [...sizes.values()].reduce((p, v) => p + v, 0) / sizes.size
      }
    }
  }

  // 0-30
  checkRange(0, param.keeps - 1)
  return {
    handleScroll,
    saveSize
  }
}
