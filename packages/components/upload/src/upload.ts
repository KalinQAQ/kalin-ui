import { ExtractPropTypes, PropType } from 'vue'

export {}

export interface UploadFile {
  // input框
  uid?: number
  name: string
  url?: string // new ObjectURL
  percentage?: number
  raw: File
  size?: number
  status: string
}
export type UploadFiles = UploadFile[]

// 给组件的使用也定义一些类型，给用户去使用的类型
export const baseProps = {
  FileList: {
    type: Array as PropType<UploadFiles>,
    default: () => [] as const
  },
  action: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  // input中所需要的类型
  name: {
    type: String,
    default: ''
  },
  accept: {
    type: String,
    default: ''
  },
  method: {
    type: String,
    default: 'post'
  },
  headers: {
    type: Object,
    default: () => ({})
  },
  data: {
    type: Object,
    default: () => ({})
  }
} as const

export type UploadRawFile = File & { uid: number }
export type UploadProgressEvent = ProgressEvent & { pecetange: number }
const NOOP = () => {}
export const UploadProps = {
  ...baseProps,
  onPreview: {
    // 预览的时候 可以用这个回调拿到上次的图片
    type: Function as PropType<(file: UploadFile) => void>,
    default: NOOP
  },
  beforeUpload: {
    type: Function as PropType<
      (file: UploadRawFile) => Promise<boolean> | boolean
    >,
    default: NOOP
  },
  onChange: {
    type: Function as PropType<(file: UploadFile) => void>,
    default: NOOP
  },
  boforeRemove: {
    type: Function as PropType<
      (file: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP
  },
  onRemove: {
    type: Function as PropType<
      (file: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP
  },
  onProgress: {
    type: Function as PropType<
      (
        file: UploadProgressEvent,
        uploadFile: UploadFile,
        uploadFiles: UploadFiles
      ) => void
    >,
    default: NOOP
  },
  onSuccess: {
    type: Function as PropType<
      (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP
  },
  onError: {
    type: Function as PropType<
      (err: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP
  }
} as const

export type UploadProps = ExtractPropTypes<typeof UploadProps>
