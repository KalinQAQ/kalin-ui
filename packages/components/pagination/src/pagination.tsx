import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { paginationProps } from './types'
import { createNamespace } from '@kalin-ui/utils/create'
import KPager from '@kalin-ui/components/pager'

export default defineComponent({
  name: 'KPagination',
  props: paginationProps,
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const bem = createNamespace('pagination') // k-pagination
    // 1. 首页和尾页是常驻的，如果只有一页则不显示。
    // 2. 页码按钮有一个最大数量pagerCount,最多7个。
    // 3. 如果总页数totalPage大于pagerCount，则会出现显示不下的情况，这时显示不下的部分用...表示，并且这个...是可以快速往前、往后跳转N页的。
    // 4. 中间页码应该显示的页码按钮数量在0到pagerCount - 2之间
    // 5. 只有2页的情况下，中间页码的按钮数量为0
    // 6. 大于等于pagerCount的情况下，中间按钮数量等于pagerCount - 2
    // 7. 当中间页码左边的页数大于2时，应该出现左边的 ...
    // 8. 当中间页码右边的页数小于totalPage - 3时，应该出现右边的 ...
    const pager = ref()
    const disablePrev = computed(() =>
      pager.value ? pager.value.pageIndex < 2 : true
    )
    const disableNext = computed(() =>
      pager.value ? pager.value.pageIndex > pager.value.totalPage - 1 : true
    )
    onMounted(() => {
      watch(
        () => pager.value.pageIndex,
        () => {
          emit('update:modelValue', pager.value.pageIndex)
        }
      )
      watch(
        () => props.modelValue,
        (newVal: number) => {
          pager.value.pageIndex = newVal
        }
      )
    })
    return () => {
      return (
        <div class={bem.b()}>
          <k-button
            disabled={disablePrev.value}
            onClick={() => pager.value.prevPage()}
          >
            上一页
          </k-button>
          {/* pager部分 */}
          <KPager ref={pager} {...props}></KPager>
          <k-button
            disabled={disableNext.value}
            onClick={() => pager.value.nextPage()}
          >
            下一页
          </k-button>
        </div>
      )
    }
  }
})
