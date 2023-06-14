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
          <Switcher v-if="!isLoading"></Switcher>
          <Loading v-else></Loading>
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
import Loading from './icon/Loading'
import { computed } from 'vue'

const bem = createNamespace('tree-node')

const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmitts)

function handleExpand() {
  emit('toggle', props.node)
}
const isLoading = computed(() => {
  return props.loadingKeys?.has(props.node.key)
})
</script>
