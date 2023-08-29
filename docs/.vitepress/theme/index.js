import DefaultTheme from 'vitepress/theme'
import '@kalin-ui/theme-chalk/src/index.scss'
import KIcon from '@kalin-ui/components/icon'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(KIcon) // 注册组件
  }
}
