<template>
  <div @click="handleClick" :class="[bem.b()]">
    <slot></slot>

    <input
      ref="inputRef"
      type="file"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadProps, genId } from './upload'
import { createNamespace } from '@kalin-ui/utils/create'
import { UploadRawFile } from './upload'
import { uploadContentProps } from './upload-content'

const bem = createNamespace('upload') // k-upload
defineOptions({
  name: 'k-upload'
})

async function upload(file: UploadRawFile) {
  // 输入框清空
  inputRef.value!.value = '' // 上传之前清空

  let result = await props.beforeUpload(file)

  if (result === false) return props.onRemove(file) // 停止上传

  // 添加上传的过程，调用ajax
  console.log(result)

  // 上传文件 ajax 来做处理
}
const inputRef = ref<HTMLInputElement>()
const props = defineProps(uploadContentProps)

const handleChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files!

  for (let i = 0; i < files.length; i++) {
    const rawFile = files[i] as UploadRawFile
    rawFile.uid = genId()
    props.onStart(rawFile)
    upload(rawFile)
  }
}

const handleClick = () => {
  inputRef.value!.value = ''
  inputRef.value?.click()
}
</script>

<style scoped></style>
