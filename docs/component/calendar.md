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

# Calendar 日历

显示日期

## 基本使用

设置 value 来指定当前显示的月份。value 支持 v-model 双向绑定。

<script setup lang="ts">
import { ref } from 'vue'
const currentDate = ref(new Date())
</script>

<div class="example">
  <k-calendar v-model="currentDate"> </k-calendar>
</div>

<details>
<summary>展开查看</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const currentDate = ref(new Date())
</script>

<template>
  {{ currentDate }}
  <k-calendar v-model="currentDate"> </k-calendar>
</template>
```

</details>

## 自定义内容

通过设置名为 date-cell 的 scoped-slot 来自定义日历单元格中显示的内容。 在 scoped-slot 可以获取到 date（当前单元格的日期）

<div class="example">
  <k-calendar v-model="currentDate">
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      </p>
    </template>
  </k-calendar>
</div>

<details>
<summary>展开查看</summary>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const currentDate = ref(new Date())
</script>

<template>
  {{ currentDate }}
  <k-calendar v-model="currentDate">
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      </p>
    </template>
  </k-calendar>
</template>
```

</details>

### Calendar Props

| 名称       | 类型   | 说明         |
| ---------- | ------ | ------------ |
| modelValue | `Date` | 选中项绑定值 |
| date-cell  | object | 插槽名       |
