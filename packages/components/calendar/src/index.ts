import { withInstall } from '@kalin-ui/utils/with-install'
import _Calendar from './src/calendar.vue'

const Calendar = withInstall(_Calendar)

export default Calendar

declare module 'vue' {
  export interface GlobalComponents {
    KCalendar: typeof Calendar
  }
}

export * from './src/calendar'
