import DefaultTheme from 'vitepress/theme'
import '@kalin-ui/theme-chalk/src/index.scss'
import KIcon from '@kalin-ui/components/icon'
import KButton from '@kalin-ui/components/button'
import KTree from '@kalin-ui/components/tree'
import KCalendar from '@kalin-ui/components/calendar'
import KUpload from '@kalin-ui/components/upload'
import KPagination from '@kalin-ui/components/pagination'

const plugins = [KIcon, KTree, KButton, KCalendar, KUpload, KPagination]
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // app.use(KIcon) // 注册组件
    plugins.forEach(pulgin => app.use(pulgin))
  }
}
