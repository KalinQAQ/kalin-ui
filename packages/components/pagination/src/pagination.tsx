import { computed, defineComponent, toRefs } from 'vue'
import { paginationProps } from './types'
import usePage from './use-page'
import { createNamespace } from '@kalin-ui/utils/create'

function getCurrentPage(
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

export default defineComponent({
  name: 'KPagination',
  props: paginationProps,
  emits: [],
  setup(props) {
    const bem = createNamespace('pagination') // k-pagination
    // 1. 首页和尾页是常驻的，如果只有一页则不显示。
    // 2. 页码按钮有一个最大数量pagerCount,最多7个。
    // 3. 如果总页数totalPage大于pagerCount，则会出现显示不下的情况，这时显示不下的部分用...表示，并且这个...是可以快速往前、往后跳转N页的。
    // 4. 中间页码应该显示的页码按钮数量在0到pagerCount - 2之间
    // 5. 只有2页的情况下，中间页码的按钮数量为0
    // 6. 大于等于pagerCount的情况下，中间按钮数量等于pagerCount - 2
    // 7. 当中间页码左边的页数大于2时，应该出现左边的 ...
    // 8. 当中间页码右边的页数小于totalPage - 3时，应该出现右边的 ...
    const { total, pageSize, pagerCount } = toRefs(props)
    const totalPage = computed(() => Math.ceil(total.value / pageSize.value))
    const { pageIndex, setPageIndex, jumpPage, prePage, nextPage } = usePage()
    const centerPages = computed(() =>
      getCurrentPage(totalPage.value, pageIndex.value, pagerCount.value)
    )

    return () => {
      return (
        <div class={bem.b()}>
          <k-button onClick={() => setPageIndex(pageIndex.value - 1)}>
            上一页
          </k-button>
          {/* pager部分 */}
          <ul class={bem.e('pager')}>
            <li
              onClick={() => setPageIndex(1)}
              class={{ current: pageIndex.value === 1 }}
            >
              1
            </li>
            {/* 1.总页码totalPage大于按钮数量pagerCount */}
            {/* 2.中间页码左边的页数大于Math.ceil(pagerCount.value / 2)时，应该出现左边的 ... */}
            {totalPage.value > pagerCount.value &&
              pageIndex.value > Math.ceil(pagerCount.value / 2) && (
                <li class="more left" onClick={() => jumpPage(-5)}>
                  ...
                </li>
              )}
            {/* 总页面totalPage,当前页面pageIndex,最大显示页码pageCount */}
            {centerPages.value.map(page => (
              <li
                onClick={() => setPageIndex(page)}
                class={{ current: pageIndex.value === page }}
              >
                {page}
              </li>
            ))}

            {/* 中间页码小于总页码 - 3，出现右边的... */}
            {totalPage.value > pagerCount.value &&
              pageIndex.value <
                totalPage.value - Math.ceil(pagerCount.value / 2) + 1 && (
                <li class="more right" onClick={() => jumpPage(5)}>
                  ...
                </li>
              )}
            {totalPage.value > 1 && (
              <li
                onClick={() => setPageIndex(totalPage.value)}
                class={{ current: pageIndex.value === totalPage.value }}
              >
                {totalPage.value}
              </li>
            )}
          </ul>
          <k-button onClick={() => nextPage()}>下一页</k-button>
        </div>
      )
    }
  }
})
