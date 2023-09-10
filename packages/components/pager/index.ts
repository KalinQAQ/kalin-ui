import { withInstall } from '@kalin-ui/utils/with-install'
import _Pager from './src/pager'

const Pager = withInstall(_Pager)

export default Pager
declare module 'vue' {
  export interface GlobalComponents {
    KPager: typeof _Pager
  }
}
