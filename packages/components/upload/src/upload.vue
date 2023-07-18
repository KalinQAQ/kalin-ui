<template>
  <UploadContent v-bind="uploadContentProps">
    <slot></slot>
  </UploadContent>
  {{ uploadFiles }}
  <!-- 列表 -->
  <!-- 预览 -->
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UploadContent from './upload-content.vue'
import {
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
  UploadRawFile,
  uploadProps
} from './upload'
import { ref } from 'vue'
import { watch } from 'vue'

// 父组件接收了 uploadProps
defineOptions({
  name: 'k-upload'
})
const props = defineProps(uploadProps)
const emits = defineEmits(['onUpdate:file-list'])

const uploadFiles = ref<UploadFiles>(props.FileList)

watch(uploadFiles, newVal => {
  // 监控文件变化，发射事件
  emits('onUpdate:file-list', newVal)
})

const findFile = (rawFile: UploadRawFile) => {
  return uploadFiles.value.find(file => file.uid === rawFile.uid)
}
const uploadContentProps = computed(() => ({
  ...props,
  onStart: (rawFile: UploadRawFile) => {
    // 上传之前的逻辑，把上传的文件转化放入列表中
    const uploadFile: UploadFile = {
      uid: rawFile.uid,
      name: rawFile.name,
      percentage: 0,
      raw: rawFile,
      size: rawFile.size,
      status: 'start'
    }
    uploadFile.url = URL.createObjectURL(rawFile) // 这个字段可以实现预览
    uploadFiles.value = [...uploadFiles.value, uploadFile] // 上传列表
    props.onChange(uploadFile)
  },
  onProgress: (e: UploadProgressEvent, rawFile: UploadRawFile) => {
    const uploadFile = findFile(rawFile)!
    uploadFile.status = 'uploading'
    uploadFile.percentage = e.pecetange
    props.onProgress(e, uploadFile, uploadFiles.value)
  },
  onRemove: async (rawFile: UploadRawFile) => {
    const uploadFile = findFile(rawFile)!
    const r = await props.beforeRemove(uploadFile, uploadFiles.value)
    if (r !== false) {
      const fileList = uploadFiles.value
      fileList.splice(fileList.indexOf(uploadFile), 1)
      props.onRemove(uploadFile, uploadFiles.value)
    }
  },
  onError: (err: any, rawFile: UploadRawFile) => {
    const uploadFile = findFile(rawFile)!
    uploadFile.status = 'error'
    const fileList = uploadFiles.value
    fileList.splice(fileList.indexOf(uploadFile), 1)
    props.onError(err, uploadFile, fileList)
  },
  onSuccess: (res: any, rawFile: UploadRawFile) => {
    const uploadFile = findFile(rawFile)!
    uploadFile.status = 'success'
    const fileList = uploadFiles.value
    props.onSuccess(res, uploadFile, fileList)
  }
}))
</script>
