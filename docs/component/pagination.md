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

# 分页

## 基础

通过设置`total`属性设置分页总条目数即可

<div class="example">
  total=1应该只有首页:
  <k-pagination :total="1"></k-pagination>
  total=11应该有首页和尾页
  <k-pagination :total="11"></k-pagination>
  total=80并且当前页码=4,应该有右更多
  total=80 并且当前页码=5,应该有左更多
  <k-pagination :total="80"></k-pagination>
  total=90 并且当前页码=5,应该有左、右更多
  total=90 并且当前页码=4,应该只有右更多
  <k-pagination :total="90"></k-pagination>
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
  total=1应该只有首页
  <k-pagination :total="1"></k-pagination>
  total=11应该有首页和尾页
  <k-pagination :total="11"></k-pagination>
  total=80 并且当前页码=4,应该有右更多 total=80 并且当前页码=5,应该有左更多
  <k-pagination :total="80"></k-pagination>
  total=90 并且当前页码=5,应该有左、右更多 total=90 &&
  pageIndex=4,应该只有右更多
  <k-pagination :total="90"></k-pagination>
</template>
```

</details>

# 分页器

通过`k-pager`直接使用分页器组件

<div class="example">
  当你有较少页码
  <k-pager :total="50"></k-pager>
  当你页码超过7
  <k-pager :total="1000"></k-pager>
</div>

### Pagination Props

| 名称       | 类型     | 说明             |
| ---------- | -------- | ---------------- |
| total      | `number` | 总条目数         |
| page-size  | `number` | 每页显示条目个数 |
| page-count | `number` | 总页数           |
| v-model    | `number` | 当前页数         |
