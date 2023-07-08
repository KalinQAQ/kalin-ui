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
    @click="emitClick"
    @mousedown="emitMousedown"
  >
    <template v-if="iconPlacement === 'left'">
      <k-icon>
        <LoadingComponent v-if="loading"></LoadingComponent>
        <template v-else-if="slots.icon">
          <Component :is="slots.icon"></Component>
        </template>
      </k-icon>
    </template>
    <slot> </slot>
    <template v-if="iconPlacement === 'right'">
      <k-icon>
        <LoadingComponent v-if="loading"></LoadingComponent>
        <template v-else-if="slots.icon">
          <Component :is="slots.icon"></Component>
        </template>
      </k-icon>
    </template>
  </button>
</template>

<script lang="ts" setup>
import LoadingComponent from '@kalin-ui/components/internal-icon/Loading'
import KIcon from '@kalin-ui/components/icon'
import { createNamespace } from '@kalin-ui/utils/create'
import { buttonProps, buttonEmits } from './button'
import { useSlots } from 'vue'

const bem = createNamespace('button') // k-button
defineOptions({
  name: 'k-button',
  inheritAttrs: false
})
const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
const slots = useSlots()

const emitClick = (e: MouseEvent) => {
  emit('click', e)
}

const emitMousedown = (e: MouseEvent) => {
  emit('mousedown', e)
}
</script>
