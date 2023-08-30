<style>
    .example{
        border: 1px solid #f5f5f5;
        border-radius: 5px;
        padding:20px
    }
    .k-inco {
        margin:10px 5px
    }
    
    details > summary:first-of-type {
        font-size: 10px;
        padding: 8px 0;
        cursor: pointer;
        color: #1989fa;
    }
</style>

# Icon 图标

k-ui 推荐使用 xicons 作为图标库。

```
$ pnpm install @vicons/ionicons5
```

## 使用图标

- 如果你想像用例一样直接使用，你需要全局注册组件，才能够直接在项目里使用。

<script setup lang="ts">
import { CashOutline } from '@vicons/ionicons5'
</script>

<div class="example">
  <k-icon color="red" size="40">
    <CashOutline/>
  </k-icon>

  <k-icon color="green" size="40">
    <CashOutline/>
  </k-icon>
  <k-icon color="blue" size="40">
    <CashOutline/>
  </k-icon>
  <div>
    <k-icon color="red" size="60">
      <CashOutline/>
    </k-icon>
    <k-icon color="green" size="60">
      <CashOutline/>
    </k-icon>
    <k-icon color="blue" size="60">
      <CashOutline/>
    </k-icon>
  </div>
</div>

<details>
<summary>展开查看</summary>

```vue
<script setup lang="ts">
import { CashOutline } from '@vicons/ionicons5'
</script>
<template>
  <k-icon color="red" size="40">
    <CashOutline />
  </k-icon>
</template>
```

</details>

## API

### Icon Props

| 名称  | 类型             | 默认值    | 说明     |
| ----- | ---------------- | --------- | -------- |
| color | string           | undefined | 图标颜色 |
| size  | number \| string | undefined | 图片大小 |
