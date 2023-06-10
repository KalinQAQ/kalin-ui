<template>tree</template>

<script setup lang="ts">
import { createNamespace } from '@kalin-ui/utils/create'
import { TreeNode, TreeOption, treeProps } from './tree'
import { ref } from 'vue'
import { watch } from 'vue'
const bem = createNamespace('tree')
defineOptions({ name: 'k-tree' })

const props = defineProps(treeProps)

// 有了props 要对用户的数据进行格式化，格式化一个固定的结果
// label, key, children

// 我们将props.data 格式化后放到tree中
const tree = ref<TreeNode[]>([])

function createOption(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string // 用户传递的key
    },
    getLabel(node: TreeOption) {
      return node[label] as string // 用户传递的label
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[] // 用户传递的children 获取孩子
    }
  }
}

const treeOptions = createOption(
  props.keyField,
  props.laelField,
  props.childrenField
)
function createTree(data: TreeOption[]): any {
  function traversal(data: TreeOption[]) {
    return data.map(node => {
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: treeOptions.getChildren(node)
      }
    })
  }

  const res: TreeNode[] = traversal(data)
  return res
}

// 监控数据变化，调用格式化方法，一上来先格式化一次
watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data)
  },
  { immediate: true }
)
</script>
