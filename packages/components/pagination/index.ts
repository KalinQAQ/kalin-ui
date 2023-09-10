import { withInstall } from '@kalin-ui/utils/with-install'
import _Pagination from './src/pagination'

const Pagination = withInstall(_Pagination)

export default Pagination

declare module 'vue' {
  export interface GlobalComponents {
    KPagination: typeof _Pagination
  }
}
