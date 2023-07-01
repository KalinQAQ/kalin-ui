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
import { ref } from 'vue'
import { FormItemValidateState, formItemProps } from './form-item'

const bem = createNamespace('form-item')

const props = defineProps(formItemProps)

// 组件名字
defineOptions({
  name: 'k-form-item'
})

// 校验逻辑
const validateState = ref<FormItemValidateState>('')
const validateMessage = ref('校验失败')
</script>

<style lang="scss" scoped></style>
