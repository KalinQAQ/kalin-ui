<template>
  <div
    class="item"
    :style="{
      height: '70px'
    }"
    :data-index="source.index"
  >
    <div class="head">
      <span>{{ source.index }}</span>
      <span>{{ source.name }}</span>
    </div>
    <div class="body">
      <span>{{ source.desc }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  source: {
    type: Object,
    default: () => ({})
  }
})
</script>
