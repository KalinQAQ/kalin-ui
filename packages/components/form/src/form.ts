// 这里用来定义 form表单 中所需要的属性

import { ExtractDefaultPropTypes, InjectionKey, PropType } from 'vue'
import { Arrayable, FormItemRule, FormItemContext } from './form-item'

export const formProps = {
  model: Object,
  rules: {
    type: Object as PropType<Record<string, Arrayable<FormItemRule>>>
  },
  showMessage: {
    type: Boolean,
    default: true
  }
} as const

// 表单属性
export type FormProps = Partial<ExtractDefaultPropTypes<typeof formProps>>
export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
}

// 表单上下文key，包含所有props
export const FormContextKey: InjectionKey<FormContext> = Symbol()
