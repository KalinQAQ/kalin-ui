<style>
  .example{
    border: 1px solid #f5f5f5;
    border-radius: 5px;
    padding:20px;
    width: 100%;
  }

  details > summary:first-of-type {
    font-size: 10px;
    padding: 8px 0;
    cursor: pointer;
    color: #1989fa;
  }
</style>

# 🌲 树 Tree

基本使用

<script setup lang="ts">
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

// 异步加载
function createData1() {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false // 这里isLeaf 为false 表示点击的时候动态的加载子节点
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false
    }
  ]
}

function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, thecreated universe') {
    return 'Out of Tao, One is born'
  }
  return ''
}
const data1 = ref<TreeOption[]>(createData1())

const handleLoad = (node: TreeOption) => {
  return new Promise<TreeOption[]>(resolve => {
    setTimeout(() => {
      resolve([
        // 这个数据回作为当前展开的node的children属性
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false
        }
      ])
    }, 1000)
  })
}
const data = ref(createData())
</script>

<div class="example">
  <k-tree :data="data"></k-tree>
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
  <KTree :data="data"></KTree>
</template>
<script setup>
import { ref } from 'vue'
// 创建渲染数据
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
const data = ref<TreeOption[]>(createData())
</script>
```

</details>

# 🌲 树组件异步加载

异步加载使用 on-load 回调来加载数据。异步加载时，所有 isLeaf 为 false 并且 children 不为数组的节点会被视为未加载的节点。

<div class="example">
  <k-tree :data="data1" :on-load="handleLoad"> </k-tree>
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
  <KTree :data="data" checkable></KTree>
</template>
<script setup>
import { ref } from 'vue'

function createData() {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false // 这里isLeaf 为false 表示点击的时候动态的加载子节点
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false
    }
  ]
}

function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, thecreated universe') {
    return 'Out of Tao, One is born'
  }
  return ''
}
const data = ref<TreeOption[]>(createData())

const handleLoad = (node: TreeOption) => {
  return new Promise<TreeOption[]>(resolve => {
    setTimeout(() => {
      resolve([
        // 这个数据回作为当前展开的node的children属性
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false
        }
      ])
    }, 1000)
  })
}
</script>
<template>
  <k-tree :data="data" :on-load="handleLoad"> </k-tree>
</template>
```

</details>

### Tree Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| key | string \| number | undefined | 图标颜色 |
| label | string | undefined | 图片大小 |
| disabled | boolean | false | 禁用节点 |
| isLeaf | boolean | undefined | 是否为叶子节点 |
| children | TreeOption[] | [] | 儿子节点 |
| defaultExpandedKeys | string[] \| number[] | [] | 要展开的 key |
| keyField | string | 'key' | key 字段的别名 |
| labelField | string | 'label' | label 字段的别名 |
| childrenField | string | 'children' | children 字段的别名 |
| multiple | boolean |  | 支持多选 |
| data | TreeOption[] | [] | 所有数据 |
| selectable | boolean | true | 是否可选 |
| onLoad | (node:TreeOption)=>Promise<TreeOption[]> | undefined | 异步加载方法 |
