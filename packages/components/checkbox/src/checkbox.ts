import { ExtractDefaultPropTypes, PropType } from 'vue'

export const checkboxProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>
  },
  indeterminate: Boolean,
  disabled: Boolean,
  label: {
    type: String as PropType<string>
  }
} as const

export type checkboxProps = Partial<
  ExtractDefaultPropTypes<typeof checkboxProps>
>

export const checkboxEmits = {
  'update:modelValue': (value: boolean | string | number) => value,
  change: (value: boolean) => value
}

export type checkboxEmits = typeof checkboxEmits
