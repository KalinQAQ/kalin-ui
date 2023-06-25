<template>
  <button
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('disabled', disabled)
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
  >
    <k-icon>
      <LoadingComponent v-if="loading"></LoadingComponent>
    </k-icon>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import LoadingComponent from '@kalin-ui/components/internal-icon/Loading'
import KIcon from '@kalin-ui/components/icon'
import { createNamespace } from '@kalin-ui/utils/create'
import { buttonProps, buttonEmits } from './button'

const bem = createNamespace('button') // k-button
defineOptions({
  name: 'k-button'
})
const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
</script>
