import { defineComponent, onBeforeMount, ref } from 'vue'
import { RangeOptions, updateType, virtualProps } from './props'
import { initVirtual } from './virtual'

export default defineComponent({
  name: 'k-virtual-scroll-list',
  props: virtualProps,
  setup(props, {}) {
    // return () => {
    // 默认情况下我们希望显示30条数据，其它的要用空白来代替
    // 给内部盒子一个非常高的高度 + translate 来实现
    // 用上下padding 来撑开
    // 需要先定义一下数据的显示范围，还有上padding 和 下padding的一个大小
    const range = ref<RangeOptions | null>(null)
    const update: updateType = (newRange: RangeOptions) => {
      range.value = newRange
    }
    const getUniqueIdFromDataSources = (): string[] => {
      const { dataSources, dataKey } = props

      return dataSources.map(
        dataSource => (dataSource as any)[dataKey]
      ) as string[]
    }
    let virtual: ReturnType<typeof initVirtual>

    const installVirtual = () => {
      // 初始化逻辑，把用户的属性传进去，调用回调来更新范围
      virtual = initVirtual(
        {
          keeps: props.keeps,
          buffer: Math.round(props.keeps / 3),
          uniqueIds: getUniqueIdFromDataSources(),
          estimateSize: props.estimateSize
        },
        update
      )
    }
    onBeforeMount(() => {
      // 计算start，end。。
      installVirtual()
    })

    function genRenderComponent() {
      const slots = []
      const { start, end } = range.value!
      const { dataSources, dataComponent, dataKey } = props
      for (let index = start; index <= end; index++) {
        const dataSource = dataSources[index]
        const uniqueKey = (dataSource as any)[dataKey]
        if (dataSource) {
          slots.push(
            <dataComponent key={uniqueKey} source={dataSource}></dataComponent>
          )
        }
      }
      return slots
    }

    return () => {
      const { padBehind, padFront } = range.value!
      // 应该考虑是横向的还是纵向的的
      const paddingStyle = {
        padding: `${padFront}px 0 ${padBehind}px`
      }
      return (
        <div>
          <div style={paddingStyle}>{genRenderComponent()}</div>
        </div>
      )
    }
    // }
  }
})
