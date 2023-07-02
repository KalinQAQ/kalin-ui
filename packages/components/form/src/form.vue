<template>
  <form :class="[bem.b()]">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { createNamespace } from '@kalin-ui/utils/create'
import { formContextKey, formProps } from './form'
import { provide, reactive, toRefs } from 'vue'

const bem = createNamespace('form')
const props = defineProps(formProps)
defineOptions({
  name: 'KForm'
})
provide(formContextKey, reactive({ ...toRefs(props) }))
</script>
