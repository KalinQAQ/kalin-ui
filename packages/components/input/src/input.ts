import { ExtractPropTypes, PropType } from 'vue'
import { isString } from '@vue/shared'

export const inputProps = {
  modelValue: {
    // v-model绑定的属性
    type: [Number, String] as PropType<number | string>,
    default: ''
  },
  // 输入框类型
  type: { type: String, default: 'text' }, 
  // 输入提示
  placeholder: { type: String }, 
  // 是否禁用
  disabled: { type: Boolean, default: false },
  //是否仅读
  readonly: { type: Boolean, default: false },
  // 是否带有清空按钮
  clearable: { type: Boolean },
  // 密码框是否显示密码
  showPassword: { type: Boolean, default: false },
  // input配合的label属性
  label: { type: String }
} as const
export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  'update:modelValue': (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  keydown: (evt: KeyboardEvent) => evt instanceof Event, // input相关事件
  clear: () => true // 清空事件
}
export type InputEmits = typeof inputEmits