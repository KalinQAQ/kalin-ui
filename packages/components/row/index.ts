import { withInstall } from '@kalin-ui/utils/with-install'
import _Row from './src/row'

const Row = withInstall(_Row) // 为了用户可以将组件进行全局安装 app.use

export default Row

declare module 'vue' {
  export interface GlobalComponents {
    KRow: typeof Row
  }
}

export * from './src/props'
