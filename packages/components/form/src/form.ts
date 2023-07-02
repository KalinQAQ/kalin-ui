// 这里用来定义 form表单 中所需要的属性

import { ExtractPropTypes, InjectionKey, PropType, SetupContext } from 'vue'
import { Arrayable, FormItemRule, FormItemContext } from './form-item'
import { isString } from '@vue/shared'

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

export const formEmits = {
  validate: (prop: string, isValid: boolean, message: string) => {
    typeof isValid === 'boolean' && isString(message) && isString(prop)
  }
}

// 表单属性
export type FormEmits = typeof formEmits
export type FormProps = Partial<ExtractPropTypes<typeof formProps>>
export type FormContext = FormProps & {
  emit: SetupContext<FormEmits>['emit']
  addField: (field: FormItemContext) => void
}

// 表单上下文key，包含所有props
export const FormContextKey: InjectionKey<FormContext> = Symbol()
