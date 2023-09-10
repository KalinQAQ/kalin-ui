import { ExtractPropTypes } from 'vue'
import { paginationProps } from '../../pagination/src/types'

export const pagerProps = paginationProps
export type PagerProps = ExtractPropTypes<typeof pagerProps>
