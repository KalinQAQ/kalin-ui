import { withInstall } from '@kalin-ui/utils/with-install'
import _Calendar from './src/calendar.vue'

// 组件为了能变成全局组件，需要增加一个install方法，使用的适合可以通过use方法来调用
const Calendar = withInstall(_Calendar)

export default Calendar

declare module 'vue' {
  export interface GlobalComponents {
    KCalendar: typeof Calendar
  }
}

export * from './src/calendar'
