import { withInstall } from '@kalin-ui/utils/with-install'
import _Virtual from './src/virtual'

const Tree = withInstall(_Virtual)

export default Tree

declare module 'vue' {
  export interface GlobalComponents {
    KVirtualList: typeof _Virtual
  }
}
