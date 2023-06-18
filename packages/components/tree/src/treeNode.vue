<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected),
      bem.is('disabled', node!.disabled)
    ]"
  >
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: `${node!.level * 16}px` }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node?.isLeaf },
          bem.is('leaf', node!.isLeaf)
        ]"
        @click="handleExpand"
      >
        <k-icon size="25" color="pink">
          <Switcher v-if="!isLoading"></Switcher>
          <Loading v-else></Loading>
        </k-icon>
      </span>
      <span @click="handleContentClick(node)" :class="bem.e('label')">
        <KTreeNodeContent :node="node"></KTreeNodeContent>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Switcher from './icon/Switcher'
import KIcon from '@kalin-ui/components/icon'
import { createNamespace } from '@kalin-ui/utils/create'
import { TreeNode, treeInjectKey, treeNodeEmitts, treeNodeProps } from './tree'
import Loading from './icon/Loading'
import KTreeNodeContent from './tree-node-content'
import { computed, inject } from 'vue'

const bem = createNamespace('tree-node')

const props = defineProps(treeNodeProps)

const emit = defineEmits(treeNodeEmitts)
function handleExpand() {
  emit('toggle', props.node!)
}
const isLoading = computed(() => {
  return props.loadingKeys?.has(props.node!.key)
})

const isSelected = computed(() => {
  return props.selectedKeys.includes(props.node!.key)
})

const handleContentClick = (node: TreeNode) => {
  //内容点击触发选择
  if (node?.disabled) return
  emit('select', node)
}

const treeContext = inject(treeInjectKey)
</script>
