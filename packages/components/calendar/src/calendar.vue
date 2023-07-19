<template>
  <div :class="nsCal.b()">
    <div :class="nsCal.e('header')">
      <div :class="nsCal.e('title')">{{ currentDate }}</div>
      <div :class="nsCal.e('button-group')">
        <k-button @click="$event => selectDate('prev-year')"> 前一年 </k-button>
        <k-button @click="$event => selectDate('prev-month')">
          上个月
        </k-button>
        <k-button @click="$event => selectDate('today')"> 今天 </k-button>
        <k-button @click="$event => selectDate('next-month')">
          下个月
        </k-button>
        <k-button @click="$event => selectDate('next-year')"> 下一年 </k-button>
      </div>
    </div>
    <div :class="nsCal.e('body')">
      <table :class="nsTable.b()" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th v-for="day in weekDays" :key="day">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rid) in rows" :key="rid">
            <td
              v-for="(cell, cid) in row"
              :key="cid"
              :class="[nsDay.b(), getCellClass(cell)]"
              @click="handlePick(cell)"
            >
              <slot name="date-cell" :data="getSlotData(cell)">
                {{ cell.text }}
              </slot>
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
import { computed, ref } from 'vue'
import {
  CalendarDateCell,
  CalendarDateCellType,
  CalendarDateType,
  calendarEmits,
  calendarProps
} from './calendar'
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

// 面板部分 [[],[],[],[],[],[]]
const rows = computed(() => {
  //根据用户提供的日期 计算出42个来
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

const prevMonthDay = computed(() => date.value.subtract(1, 'month').date(1))
const nextMonthDay = computed(() => date.value.add(1, 'month').date(1))
const prevYearDay = computed(() => date.value.subtract(1, 'year').date(1))
const nextYearDay = computed(() => date.value.add(1, 'year').date(1))
const emit = defineEmits(calendarEmits)

function pickDay(day: Dayjs) {
  selectedDay.value = day
  emit('update:modelValue', day.toDate())
}
function selectDate(type: CalendarDateType) {
  // 采用策略来优化
  const dateMap: Record<CalendarDateType, Dayjs> = {
    'prev-month': prevMonthDay.value,
    'next-month': nextMonthDay.value,
    'prev-year': prevYearDay.value,
    'next-year': nextYearDay.value,
    today: now
  }
  const day = dateMap[type] // 找到日期，更改date日期，自动根据日期来计算
  pickDay(day)
}

function formatter(text: number, type: CalendarDateCellType): Dayjs {
  switch (type) {
    case 'prev':
      return date.value.startOf('month').subtract(1, 'month').date(text)
    case 'current':
      return date.value.date(text)
    case 'next':
      return date.value.startOf('month').add(1, 'month').date(text)
  }
}
const selectedDay = ref<Dayjs>() // 用于表示当前用户选择的是哪一个
function handlePick({ text, type }: CalendarDateCell) {
  // 根据text和type获取日期来更新date
  const day = formatter(text, type)

  pickDay(day)
}
function getCellClass({ text, type }: CalendarDateCell) {
  const clazz: string[] = [type]

  const date = formatter(text, type)
  if (date.isSame(selectedDay.value, 'day')) {
    // 如果选中的日期和 当前循环的日期相同，就标识选中了
    clazz.push(nsDay.is('selected', true))
  }
  if (date.isSame(now, 'day')) {
    clazz.push(nsDay.is('today', true))
  }
  return clazz
}
const currentDate = computed(() => {
  return `${date.value.year()}年${
    date.value.month() + 1
  }月${date.value.day()}日`
})

function getSlotData({ text, type }: CalendarDateCell) {
  const day = formatter(text, type)
  return {
    isSelected: day.isSame(selectedDay.value),
    day: day.format('YYYY-MM-DD'),
    date: day.toDate(),
    type
  }
}
</script>

<style scoped></style>
