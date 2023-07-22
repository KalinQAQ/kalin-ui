import { withInstall } from '@kalin-ui/utils/with-install'
import _VirtualList from './src/virtual-list'

const VirtualList = withInstall(_VirtualList) // 为了用户可以将组件进行全局安装 app.use

export default VirtualList

declare module 'vue' {
  export interface GlobalComponents {
    KVirtualScrollList: typeof VirtualList
  }
}

export * from './src/props'
