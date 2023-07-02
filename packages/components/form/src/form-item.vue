<template>
  <div
    :class="[
      bem.b(),
      bem.is('success', validateState == 'success'),
      bem.is('error', validateState === 'error')
    ]"
  >
    <label :class="bem.e('label')">
      <slot name="label">
        {{ label }}
      </slot></label
    >
    <div :class="bem.e('content')">
      <slot></slot>
      <div :class="bem.e('error')">
        <slot name="error">
          {{ validateMessage }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { createNamespace } from '@kalin-ui/utils/create'
import { inject, onMounted, provide, ref } from 'vue'
import { FormContextKey } from './form'
import { Arrayable, FormItemRule, FormItemValidateState } from './form-item'
import { formItemProps, FormItemContext } from './form-item'
import AsyncValdaitor, { Values } from 'async-validator'

const formContext = inject(FormContextKey)

const bem = createNamespace('form-item')

const props = defineProps(formItemProps)

// 增加组件名字
defineOptions({
  name: 'k-form-item'
})

// 这里主要是检验逻辑

const validateState = ref<FormItemValidateState>('') // success
const validateMessage = ref('')

const convertArray = (
  rules: Arrayable<FormItemRule> | undefined
): FormItemRule[] => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : []
}

const _rules = computed(() => {
  const myRules = convertArray(props.rules) // 自己的规则
  const formRules = formContext?.rules
  if (formRules && props.prop) {
    const _temp = formRules[props.prop]
    if (_temp) {
      myRules.push(...convertArray(_temp))
    }
  }
  return myRules
})

const getRuleFiltered = (trigger: string) => {
  // blur change  ''
  const rules = _rules.value

  return rules.filter(rule => {
    if (!rule.trigger || !trigger) return true // 这种情况意味着无论如何都要校验
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger === trigger
    }
  })
}

const onValidationSuccesseded = (state: FormItemValidateState) => {
  validateState.value = state
  formContext?.emit('validate', props.prop!, true, '')
}
const onValidationFailed = (err: Values) => {
  const { errors } = err
  validateState.value = !errors ? 'success' : 'error'
  validateMessage.value = errors ? errors[0].message : ''
  formContext?.emit('validate', props.prop!, false, validateMessage.value)
}
const validate: FormItemContext['validate'] = async (trigger, callback?) => {
  // 拿到触发的时机，校验是否通过可以调用callback 或者调用promise.then方法
  const rules = getRuleFiltered(trigger)

  // rules 就是触发的规则 , trigger就是触发的方式
  // 需要找到对应的数据源头 上面找到对应的prop

  // 触发事件了 ，找到对应的规则，和数据源在哪里，校验那个属性
  const modelName = props.prop!
  // 拿到校验器
  const validator = new AsyncValdaitor({
    [modelName]: rules
  })
  const model = formContext?.model!

  return validator
    .validate({
      [modelName]: model[modelName]
    })
    .then(() => {
      onValidationSuccesseded('success')
    })
    .catch((err: Values) => {
      onValidationFailed(err)
      return Promise.reject(err)
    })
}

const context: FormItemContext = {
  ...props,
  validate
}
// let {xxx} = toRefs(props)
// xxx.value

provide('form-item', context)

onMounted(() => {
  // 如果有属性，就让其收集上下⽂
  formContext?.addField(context)
})
</script>
