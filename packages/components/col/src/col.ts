import { computed, defineComponent, h, inject } from 'vue'
import { colProps } from './props'

export default defineComponent({
  name: 'k-col',
  props: colProps,
  setup(props, { slots }) {
    const gutter = inject('KRow', 0)
    const classs = computed(() => {
      const ret: string[] = []
      const pos = ['span', 'offset'] as const
      pos.forEach(item => {
        const size = props[item]
        if (typeof size === 'number' && size > 0) {
          ret.push(`k-col-${item}-${props[item]}`)
        }
      })
      return ['k-col', ...ret]
    })
    const styles = computed(() => {
      if (gutter !== 0) {
        return {
          paddingLeft: gutter / 2 + 'px',
          paddingRight: gutter / 2 + 'px'
        }
      }
      return {}
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
