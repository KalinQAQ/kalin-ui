import { UploadProgressEvent } from './upload'
import { RequestOptions } from './upload-content'

export function httpRequest(options: RequestOptions) {
  const xhr = new XMLHttpRequest()
  const action = options.action

  xhr.open(options.method, action, true) // 初始化一个新创建的请求

  // 监听加载进度
  xhr.upload.addEventListener('progress', e => {
    // 加载的总数和已经加载的

    const processEvents = e as UploadProgressEvent
    processEvents.pecetange = e.total > 0 ? (e.loaded / e.total) * 100 : 0

    options.onProgress(processEvents) // 调用上传进度
  })

  const headers = options.headers
  if (headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      xhr.setRequestHeader(key, value)
    }
  }

  const formData = new FormData()
  if (options.data) {
    // 传请求体
    for (const [key, value] of Object.entries(options.data)) {
      formData.append(key, value)
    }
  }
  // 传文件
  formData.append(options.name, options.file)
  // 监听加载完成
  xhr.onload = function () {
    if (xhr.status < 300 && xhr.status >= 200) {
      options.onSuccess(xhr.response)
    } else {
      options.onError({ status: xhr.status })
    }
  }

  xhr.addEventListener('error', function (err) {
    options.onError(err)
  })

  xhr.send(formData)

  return xhr
}
