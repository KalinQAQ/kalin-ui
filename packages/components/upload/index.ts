import { withInstall } from '@kalin-ui/utils/with-install'
import _Upload from './src/upload.vue'

const Upload = withInstall(_Upload) // 为了用户可以将组件进行全局安装 app.use

export default Upload

declare module 'vue' {
  export interface GlobalComponents {
    KUpload: typeof Upload
  }
}

export * from './src/upload'
