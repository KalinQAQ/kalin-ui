import { withInstall } from '@kalin-ui/utils/with-install'
import _Input from './src/input.vue'
export const Input = withInstall(_Input)
export default Input
export * from './src/input'
declare module 'vue' {
  export interface GlobalComponents {
    KInput: typeof Input
  }
}
