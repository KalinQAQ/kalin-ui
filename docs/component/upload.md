<style>
  .example{
    border: 1px solid #f5f5f5;
    border-radius: 5px;
    padding:20px;
    width: 100%;
  }

  details > summary:first-of-type {
    font-size: 10px;
    padding: 8px 0;
    cursor: pointer;
    color: #1989fa;
  }
</style>

# Upload 上传

通过点击或者拖拽上传文件。

## 基本用法

通过 `slot` 你可以传入自定义的上传按钮类型和文字提示。可通过设置`multiple`来支持多文件上传。 可通过设置 `before-remove` 来阻止文件移除操作。

<script setup lang="ts">
import { CloudUpload } from '@vicons/ionicons5'
const handleBeforeUpload = (rawFile: UploadRawFile) => {
  return true
}
</script>
<div class="example">
  <k-upload
    multiple
    :before-upload="handleBeforeUpload"
    action="http://localhost:4000/upload"
  >
    <k-button type="primary">点我上传</k-button>
  </k-upload>
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
  <k-upload
    multiple
    :before-upload="handleBeforeUpload"
    action="http://localhost:4000/upload"
  >
    <k-button type="primary">点我上传</k-button>
  </k-upload>
</template>
<script setup lang="ts">
const handleBeforeUpload = (rawFile: UploadRawFile) => {
  return true
}
</script>
```

</details>

## 拖拽上传

你可以将文件拖拽到特定区域以进行上传。

<div class="example">
  <k-upload
    multiple
    :before-upload="handleBeforeUpload"
    action="http://localhost:4000/upload"
    drag
  >
    <span>
    <k-icon>
      <CloudUpload></CloudUpload>
    </k-icon>拖拽到此上传</span>
  </k-upload>
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
  <k-upload
    multiple
    :before-upload="handleBeforeUpload"
    action="http://localhost:4000/upload"
    drag
  >
    <span>
      <k-icon> <CloudUpload></CloudUpload> </k-icon>拖拽到此上传</span
    >
  </k-upload>
</template>
<script setup lang="ts">
const handleBeforeUpload = (rawFile: UploadRawFile) => {
  return true
}
</script>
```

</details>

## 上传 API

### Icon Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| action | string | — | 请求 URL |
| headers | Headers | — | 设置上传的请求头部 |
| method | string | 'post' | 设置上传请求方法 |
| multiple | boolean | false | 是否支持多选文件 |
| name | string | 'file' | 上传的文件字段名 |
| drag | boolean | false | 是否启用拖拽上传 |
| on-remove | (uploadFile: UploadFile, uploadFiles: UploadFiles) => void | — | 文件列表移除文件时的钩子 |
| on-success | (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void | — | 文件上传成功时的钩子 |
| on-error | (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void | — | 文件上传失败时的钩子 |
| on-progress | (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void | — | 文件上传时的钩子 |
| on-change | (uploadFile: UploadFile, uploadFiles: UploadFiles) => void | — | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 |
