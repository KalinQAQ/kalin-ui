import { computed, defineComponent, h, provide } from 'vue'
import { rowProps } from './props'

export default defineComponent({
  name: 'k-row',
  props: rowProps,
  setup(props, { slots }) {
    provide('KRow', props.gutter) // 提供给所有子组件，都能使用这个属性
    const classs = computed(() => [
      'k-row',
      props.justify !== 'start' ? `is-justify-${props.justify}` : ''
    ])
    const styles = computed(() => {
      const ret = {
        marginLeft: '',
        marginRight: ''
      }
      if (props.gutter) {
        // 放大宽度
        ret.marginLeft = `-${props.gutter / 2}px`
        ret.marginRight = ret.marginLeft
      }
      return ret
    })
    return () =>
      h(
        props.tag,
        {
          class: classs.value,
          style: styles.value
        },
        slots.default?.()
      )
  }
})
