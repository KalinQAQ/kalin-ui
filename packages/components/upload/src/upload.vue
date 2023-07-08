<template>
  <UploadContent>
    <slot></slot>
  </UploadContent>

  <!-- 列表 -->
  <!-- 预览 -->
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UploadContent from './upload-content.vue'
import { createNamespace } from '@kalin-ui/utils/create'
import { UploadProps } from './upload'

const bem = createNamespace('upload') // k-upload
// 父组件接收了 uploadProps
defineOptions({
  name: 'k-upload'
})
const props = defineProps(UploadProps)

const uploadContentProps = computed(() => ({
  ...props,
  onStart: rawFile => {},
  onProgress: e => {},
  onRemove: rawFile => {},
  onSuccess: err => {},
  onError: res => {}
}))
</script>

<style scoped></style>
