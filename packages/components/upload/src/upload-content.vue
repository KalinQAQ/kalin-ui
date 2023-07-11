<template>
  <div @click="handleClick" :class="[bem.b()]">
    <template v-if="drag">
      <uploadDragger @file="uploadFiles">
        <slot></slot>
      </uploadDragger>
    </template>
    <template v-else>
      <slot></slot>
    </template>
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
import uploadDragger from './upload-dragger.vue'
import { ref } from 'vue'
import { UploadProps, genId } from './upload'
import { createNamespace } from '@kalin-ui/utils/create'
import { UploadRawFile } from './upload'
import { uploadContentProps } from './upload-content'
import { httpRequest } from './ajax'

const bem = createNamespace('upload') // k-upload
defineOptions({
  name: 'k-upload',
  inheritAttrs: false
})
const props = defineProps(uploadContentProps)

async function upload(rawFile: UploadRawFile) {
  // 输入框清空
  inputRef.value!.value = '' // 上传之前清空

  const result = await props.beforeUpload(rawFile)

  if (result === false) return props.onRemove(rawFile) // 停止上传

  // 添加上传的过程，调用ajax
  // 上传文件 ajax 来做处理
  const { method, name, action, headers, data } = props
  httpRequest({
    method,
    name,
    file: rawFile,
    action,
    headers,
    data,
    onError: e => {
      props.onError(e, rawFile)
    },
    onSuccess: res => {
      props.onSuccess(res, rawFile)
    },
    onProgress: e => {
      props.onProgress(e, rawFile)
    }
  })
}
const inputRef = ref<HTMLInputElement>()

function uploadFiles(files: FileList) {
  for (let i = 0; i < files.length; i++) {
    const rawFile = files[i] as UploadRawFile
    rawFile.uid = genId()
    props.onStart(rawFile)
    upload(rawFile)
  }
}
const handleChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files!
  uploadFiles(files)
}

const handleClick = () => {
  inputRef.value!.value = ''
  inputRef.value?.click()
}
</script>

<style scoped></style>
