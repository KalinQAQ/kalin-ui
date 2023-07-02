<template>
  <form :class="bem.b()">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { createNamespace } from '@kalin-ui/utils/create'
import { Values } from 'async-validator'
import { provide, reactive } from 'vue'
import { formProps, FormContextKey, FormContext, formEmits } from './form'
import { FormItemContext } from './form-item'
import { toRefs } from 'vue'
const bem = createNamespace('form')
defineOptions({
  name: 'k-form'
})

const props = defineProps(formProps)

const fields: FormItemContext[] = [] // 父亲收集儿子

// form的校验,在父级中调用所有儿子的校验方法
const validate = async (
  callback?: (valid: boolean, fields?: Values) => void
) => {
  let errors: Values = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (error) {
      errors = {
        ...errors,
        ...(error as Values).fields
      }
    }
  }
  // 没有错误就成功
  if (Object.keys(errors).length === 0) {
    return callback?.(true)
  } else {
    // 有错误就失败
    if (callback) {
      callback?.(false, errors)
    } else {
      return Promise.reject(errors)
    }
  }
}

const emit = defineEmits(formEmits)
const addField: FormContext['addField'] = field => {
  fields.push(field)
}

provide(
  FormContextKey,
  reactive({
    ...toRefs(props),
    emit,
    addField
  })
)

// 将form表单的校验方法 暴露给用户，用户可以通过ref来进行检测
defineExpose({
  validate
})
</script>
