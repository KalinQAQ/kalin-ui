<template>
  <label :class="bem.b()">
    <span :class="bem.e('input')">
      <input
        ref="inputRef"
        v-model="model"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        @change="handleChange"
      />
    </span>
    <span v-if="$slots.default || label" :class="bem.e('label')">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { createNamespace } from '@kalin-ui/utils/create'
import { checkboxProps, checkboxEmits } from './checkbox'

const bem = createNamespace('checkbox')
const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

defineOptions({
  name: 'k-checkbox'
})
const inputRef = ref<HTMLInputElement>()
// 不能直接v-model="modelValue",这样修改了传来的属性
const model = computed<any>({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

function indeterminate(val: boolean) {
  inputRef.value!.indeterminate = val
}
function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.checked ? true : false
  emit('change', value)
}

watch(() => props.indeterminate, indeterminate)

onMounted(() => {
  indeterminate(props.indeterminate)
})
</script>
