import DefaultTheme from 'vitepress/theme'
import '@kalin-ui/theme-chalk/src/index.scss'
import NIcon from '@kalin-ui/components/icon'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(NIcon) // 注册组件
  }
}
