<template>
  <div
    :class="[
      bem.b(),
      bem.is('success', validateState === 'success'),
      bem.is('error', validateState === 'error')
    ]"
  >
    <label :class="bem.e('label')">
      <slot name="label">
        {{ label }}
      </slot>
    </label>

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

<script setup lang="ts">
import { createNamespace } from '@kalin-ui/utils/create'
import { ref, provide, toRefs, reactive, computed } from 'vue'
import {
  FormItemValidateState,
  formItemContextKey,
  formItemProps,
  FormItemContext,
  FormItemRule
} from './form-item'

const bem = createNamespace('form-item')

const props = defineProps(formItemProps)

// 组件名字
defineOptions({
  name: 'k-form-item'
})

// 校验逻辑
const validateState = ref<FormItemValidateState>('')
const validateMessage = ref('校验失败')

// 对规则进⾏格式化
const _rules = computed(() => {
  const rules: FormItemRule[] = props.rules
    ? Array.isArray(props.rules)
      ? props.rules
      : [props.rules]
    : []
  return rules
})

const getRuleFiltered = (trigger: string) => {
  // blur change ''
  const rules = _rules.value

  return rules.filter(rule => {
    if (!rule.trigger || !trigger) return true // 这种情况意味无论如何都要校验
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger === trigger
    }
  })
}
const validate = async (trigger: string, callback?) => {
  // 拿到触发的时机，校验是否通过可以调用callback 或者调用promise.then方法
  const rules = getRuleFiltered(trigger)

  // rules 就是触发的规则, trigger就是触发的方式
  console.log('trigger', trigger, rules)
}

const context: FormItemContext = reactive({
  ...toRefs(props),
  validate
})

provide(formItemContextKey, context)
</script>

<style lang="scss" scoped></style>
