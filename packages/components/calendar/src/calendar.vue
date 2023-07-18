<template>
  <div :class="nsCal.b()">
    <div :class="nsCal.e('header')">
      <div :class="nsCal.e('title')">标题</div>
      <div :class="nsCal.e('button-group')">
        <k-button>前一年</k-button>
        <k-button>上个月</k-button>
        <k-button>今天</k-button>
        <k-button>下个月</k-button>
        <k-button>下一年</k-button>
      </div>
    </div>
    <div :class="nsCal.e('body')">
      <table :class="nsTable.b()">
        <thead>
          <tr>
            <th v-for="day in weekDays" :key="day">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rid) in rows" :key="rid">
            <td v-for="(cell, cid) in row" :key="cid" :class="nsDay.b()">
              {{ cell.text }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@kalin-ui/utils/create'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { computed } from 'vue'
import { CalendarDateCell, calendarProps } from './calendar'
// 功能划分： 头部（标题 + 按钮组） + 面板
defineOptions({
  name: 'k-calendar'
})
// nsCal 规范 block + element + modifier
const nsCal = createNamespace('calendar')
const nsTable = createNamespace('calendar-table')
const nsDay = createNamespace('calendar-day')

const props = defineProps(calendarProps)
const now = dayjs() // 当前的日期
// 根据用户的属性计算当前的日期
const date = computed(() => {
  if (!props.modelValue) {
    return now
  } else {
    return dayjs(props.modelValue)
  }
})
// 0-6 0:周日 6：周六
const firstDayofWeek = dayjs().startOf('week').day()

// 表头部分
const weekMaping = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六'
]
const weekDays = computed(() => {
  return [
    ...weekMaping.slice(firstDayofWeek),
    ...weekMaping.slice(0, firstDayofWeek)
  ]
})

// 面板部分
const rows = computed(() => {
  //根据用户提供的日期 计算出24个来
  // 1.获取本月的第一天是星期几
  let list: CalendarDateCell[] = []
  const firstDay = date.value.startOf('month').day()
  const lastDay = date.value.subtract(1, 'month').endOf('month').date()
  const count = firstDay - firstDayofWeek // 前面有六天
  const prevMonthDays: CalendarDateCell[] = Array.from({ length: count })
    .map((_, idx) => lastDay - (count - idx - 1))
    .map(_ => ({
      text: _,
      type: 'prev'
    }))
  // 获取当前月有多少天
  const days = date.value.daysInMonth()
  // 当前月的天数
  const currentMonthDays: CalendarDateCell[] = Array.from({ length: days }).map(
    (_, idx) => ({
      text: idx + 1,
      type: 'current'
    })
  )

  list = [...prevMonthDays, ...currentMonthDays]

  const remaning = 42 - list.length
  const nextMonthDays: CalendarDateCell[] = Array.from({
    length: remaning
  }).map((_, idx) => ({
    text: idx + 1,
    type: 'next'
  }))

  list.push(...nextMonthDays)

  return Array.from({ length: 6 }).map((_, idx) => {
    const start = idx * 7 // 99 乘法表
    return list.slice(start, start + 7)
  })
})
console.log(rows.value)
</script>

<style scoped></style>
