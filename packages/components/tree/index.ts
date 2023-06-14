import { withInstall } from '@kalin-ui/utils/with-install'
import _Tree from './src/tree.vue'

const Tree = withInstall(_Tree)

export default Tree

declare module 'vue' {
  export interface GlobalComponents {
    KTree: typeof Tree
  }
}

export * from './src/tree'
