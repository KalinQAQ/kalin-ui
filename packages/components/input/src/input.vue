<template>
  <div :class="[bem.b()]">
    <div :class="bem.e('group')">
      <div v-if="slots.prepend" :class="bem.be('group', 'prepend')">
        <slot name="prepend"></slot>
      </div>

      <div :class="[bem.e('wrapper')]">
        <span v-if="slots.prefixIcon" :class="bem.e('prefix')">
          <slot name="prefixIcon"></slot>
        </span>
        <!-- 如果需要显示密码 在看当前是普通文本还是密码 -->
        <input
          v-bind="attrs"
          ref="input"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :class="bem.e('inner')"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          @input="handleInput"
          @change="handleChange"
          @blur="handleBlur"
          @focus="handleFocus"
        />

        <k-icon
          v-if="showPwdVisble"
          style="line-height: 16px; font-weight: bold"
          @click="handlePasswordVisible"
        >
          e
        </k-icon>
        <k-icon
          v-if="showClear"
          style="line-height: 16px; font-weight: bold"
          @click="clear"
        >
          x
        </k-icon>
        <span v-if="slots.sufixIcon" :class="bem.e('suffix')">
          <slot name="sufixIcon"></slot>
        </span>
      </div>

      <div v-if="slots.append" :class="bem.be('group', 'append')">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { createNamespace } from '@kalin-ui/utils/create'
import { useAttrs, useSlots, watch, ref, onMounted, nextTick } from 'vue'
import { inputProps, inputEmits } from './input'

defineOptions({
  name: 'k-input',
  inheritAttrs: false
})

// 获取属性及事件
const bem = createNamespace('input')
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const slots = useSlots()
const attrs = useAttrs()

// 监控value的值的变化 重新赋值

// ----------------------------------------------------
watch(
  // 监控值的变化，设置输入框的值
  () => props.modelValue,
  () => {
    setNativeInputValue()
  }
)
const input = ref<HTMLInputElement | null>(null)
const setNativeInputValue = () => {
  const inputEle = input.value
  if (!inputEle) return
  // 设置输入框的内容
  inputEle.value = String(props.modelValue)
}
onMounted(() => {
  // 组件加载完毕后 设置一次输入框的值
  setNativeInputValue()
})

// 控制密码的展示与隐藏，获取焦点

// -----------------------------------------
const focus = async () => {
  await nextTick() // 这里重新获取交点
  input.value?.focus()
}
const passwordVisible = ref(false)
const showPwdVisble = computed(() => {
  return (
    props.modelValue && props.showPassword && !props.disabled && !props.readonly
  )
})

const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
  focus()
}
// --------------------------------------------------------
const showClear = computed(() => {
  return (
    props.modelValue && props.clearable && !props.disabled && !props.readonly
  )
})
const clear = () => {
  emit('input', '')
  emit('update:modelValue', '') // 触发事件可以实现双向绑定
  emit('clear')
  focus()
}

// 用户触发的事件

// --------------------------------------------------------
const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('input', value)
  emit('update:modelValue', value) // 触发事件可以实现双向绑定
}
const handleChange = (e: Event) => {
  emit('change', (e.target as HTMLInputElement).value)
}
const handleFocus = (e: FocusEvent) => {
  emit('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  emit('blur', e)
}
// --------------------------------------------------------
</script>

<style></style>
template
