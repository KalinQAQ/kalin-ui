// 用来整合组件的 最终实现导出组件

import _CheckboxGroup from './src/checkbox=group.vue'
import { withInstall } from '@kalin-ui/utils/with-install'

const CheckboxGroup = withInstall(_CheckboxGroup)

export default CheckboxGroup // 可以通过app.use来使用 也可以通过 import方式单独使用

export * from './src/checkbox-group'

// 这里添加的类型 可以再模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    // 我们的接口可以自动合并
    KCheckGroup: typeof CheckboxGroup
  }
}
