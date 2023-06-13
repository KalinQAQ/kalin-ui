<template>
  <div :class="bem.b()">
    <div
      :class="bem.e('content')"
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
          <Switcher></Switcher>
        </k-icon>
      </span>
      <span> {{ node?.label }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Switcher from './icon/Switcher'
import KIcon from '@kalin-ui/components/icon'
import { createNamespace } from '@kalin-ui/utils/create'
import { treeNodeEmitts, treeNodeProps } from './tree'

const bem = createNamespace('tree-node')

const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmitts)

function handleExpand() {
  emit('toggle', props.node)
}
</script>
