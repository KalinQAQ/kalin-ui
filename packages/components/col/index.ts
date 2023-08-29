import { withInstall } from '@kalin-ui/utils/with-install'
import _Col from './src/col'

const Col = withInstall(_Col) // 为了用户可以将组件进行全局安装 app.use

export default Col

declare module 'vue' {
  export interface GlobalComponents {
    KCOL: typeof Col
  }
}

export * from './src/props'
