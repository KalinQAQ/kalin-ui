import { ExtractPropTypes } from 'vue'

export const rowProps = {
  tag: {
    type: String,
    default: 'div'
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    default: 'start'
  }
} as const

export type RowProps = ExtractPropTypes<typeof rowProps>
