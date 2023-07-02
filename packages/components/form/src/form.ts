// 这里用来定义 form表单 中所需要的属性

import { ExtractDefaultPropTypes, InjectionKey, PropType } from 'vue'
import { Arrayable, FormItemRule } from './form-item'

export const formProps = {
  model: Object, // 数据
  rules: {
    // 校验规则
    type: Object as PropType<Record<string, Arrayable<FormItemRule>>>
  },
  showMessage: {
    // 显示消息
    type: Boolean,
    default: true
  }
} as const

// 表单属性
export type FormProps = Partial<ExtractDefaultPropTypes<typeof formProps>>
export type FormContext = FormProps
// 表单上下文key，包含所有props
export const formContextKey: InjectionKey<FormContext> = Symbol()
