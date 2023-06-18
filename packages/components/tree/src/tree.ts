import {
  ExtractPropTypes,
  InjectionKey,
  PropType,
  SetupContext,
  provide
} from 'vue'

export type Key = string | number

export interface TreeNode extends Required<TreeOption> {
  level: number
  rawNode: TreeOption
  children: TreeNode[]
  isLeaf: boolean
}

export interface TreeOption {
  label?: Key
  key?: Key
  children?: TreeOption[]
  isLeaf?: boolean
  disabled?: boolean
  [key: string]: unknown // 任意的接口 unknown，即任意类型
}
// vue组件的props
export const treeProps = {
  // as const 是一种 TypeScript 语言的语法，在这里它是用来告诉编译器将定义的对象的属性设为只读，确保对象在运行过程中不会被错误地写入其他值。
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
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
  },
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  selectedKeys: {
    type: Array as PropType<Key[]>
  },
  selectable: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: false
  }
} as const

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    required: true
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
    required: true
  },
  selectedKeys: {
    type: Array as PropType<Key[]>,
    default: []
  }
}

export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node
}

export const treeEmitts = {
  // 内部发射的事件，用来同步响应式数据
  'update:selectedKeys': (keys: Key[]) => keys
}
/*
 ** Partial、ExtractPropTypes为typescript中的类型辅助器
 ** Partial 类型辅助器能够将对象的所有属性变成可选
 ** ExtractPropTypes 类型辅助器能够从 Vue.js 组件的 props 中提取属性的类型定义。在这里，我们使用ExtractPropTypes 辅助器从 treeProps 对象中提取 props 的类型 definition。
 */
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>

export interface TreeContext {
  slots: SetupContext['slots']
  // emit: SetupContext<typeof treeEmitts>['emit']
}

// 此变量作为提供出去的属性
export const treeInjectKey: InjectionKey<TreeContext> = Symbol()
export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
}
