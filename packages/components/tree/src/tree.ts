import { ExtractPropTypes, PropType } from 'vue'

type Key = string | number

export interface TreeNode extends Required<TreeOption> {
  level: number
  rawNode: TreeOption
}

export interface TreeOption {
  label?: Key
  key?: Key
  children?: TreeOption[]
  [key: string]: unknown // 任意的接口 unknown，即任意类型
}
// vue组件的props
export const treeProps = {
  // as const 是一种 TypeScript 语言的语法，在这里它是用来告诉编译器将定义的对象的属性设为只读，确保对象在运行过程中不会被错误地写入其他值。
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  laelField: {
    type: String,
    default: 'label'
  },
  keyField: {
    type: String,
    default: 'key'
  },
  childrenField: {
    type: String,
    default: 'children'
  }
} as const

/*
 ** Partial、ExtractPropTypes为typescript中的类型辅助器
 ** Partial 类型辅助器能够将对象的所有属性变成可选
 ** ExtractPropTypes 类型辅助器能够从 Vue.js 组件的 props 中提取属性的类型定义。在这里，我们使用ExtractPropTypes 辅助器从 treeProps 对象中提取 props 的类型 definition。
 */
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>
