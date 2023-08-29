import { ExtractPropTypes } from 'vue'

export const colProps = {
  tag: {
    type: String,
    default: 'div'
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  }
} as const

export type ColProps = ExtractPropTypes<typeof colProps>

export type pos = 'span' | 'offset'
