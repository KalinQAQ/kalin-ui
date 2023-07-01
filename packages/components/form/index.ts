// 表单组件的入口
import { withInstall } from '@kalin-ui/utils/with-install'
import _FormItem from './src/form-item.vue'
export const FormItem = withInstall(_FormItem)
export default FormItem
export * from './src/form-item'
declare module 'vue' {
  export interface GlobalComponents {
    KFormItem: typeof FormItem
  }
}
