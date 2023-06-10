<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { ref } from 'vue'

function createData(level = 4, parentKey = ''): any {
  if (!level) return []
  const arr = new Array(6 - level).fill(0)
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx
    return {
      label: createLabel(level), // 显示的内容
      key, // 为了唯一性
      children: createData(level - 1, key) // 孩子
    }
  })
}
function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}
const data = ref(createData())
</script>

<template>
  <k-icon :color="'red'" :size="40">
    <AddCircle></AddCircle>
  </k-icon>
  <k-icon :color="'yellow'" :size="40">
    <AddCircle></AddCircle>
  </k-icon>
  <!-- 在使用树组件的时候，会传递一个树型的结构 -->
  <k-tree
    :data="data"
    label-field="label"
    key-field="key"
    children-field="children"
    :default-expanded-keys="['40', '41']"
  ></k-tree>
</template>

<style scoped></style>
