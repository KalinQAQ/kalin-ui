import { ExtractPropTypes, PropType } from 'vue'

export const calendarProps = {
  // v-model = modelValue + update: modelValue
  modelValue: {
    // v-model绑定的属性
    type: Date
  },
  range: {
    type: Array as unknown as PropType<[Date, Date]>
  }
} as const

export type CalendarProps = ExtractPropTypes<typeof calendarProps>

export const calendarEmits = {
  'update:modelValue': (val: Date) => val instanceof Date
}
export type CalendarEmits = typeof calendarEmits

export type CalendarDateCellType = 'prev' | 'current' | 'next'
export type CalendarDateCell = {
  text: number
  type: CalendarDateCellType
}
