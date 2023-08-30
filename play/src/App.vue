<script setup lang="ts">
import { Key, TreeOption } from '@kalin-ui/components/tree/src/tree'
import { AddCircle } from '@vicons/ionicons5'
import { reactive, ref } from 'vue'
import { FormInstance } from '@kalin-ui/components/form'
import { Values } from 'async-validator'
import { UploadRawFile } from '@kalin-ui/components/upload'
import { Random } from 'mockjs'
import Item from './Item.vue'
import { DefineComponent } from 'vue'

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

// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false // 这里isLeaf 为false 表示点击的时候动态的加载子节点
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false
//     }
//   ]
// }

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

const data = ref(createData())
// const data = ref<TreeOption[]>([
//   {
//     key: '0',
//     label: '0',
//     children: [
//       {
//         key: '0-0',
//         label: '0-0'
//       },
//       {
//         disabled: true, // 这个节点被禁用了
//         key: '0-1',
//         label: '0-1',
//         children: [
//           {
//             label: '0-1-0',
//             key: '0-1-0'
//           },
//           {
//             label: '0-1-1',
//             key: '0-1-1'
//           }
//         ]
//       }
//     ]
//   }
// ])

const handleLoad = (node: TreeOption) => {
  // 内部肯定需要将展开的节点传递给我
  // 处理异步的两种方法: 1、回调函数 2、promise
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

const value = ref<Key[]>([])

const check = ref(true)

const handleChange = (val: boolean) => {
  console.log(val)
}

const handleClick = () => {
  console.log('点击')
}

const handleBlur = (e: any) => {
  console.log(e)
}

const handleFocus = (e: any) => {
  console.log(e)
}

const state = reactive({ username: '', password: '' })

const formRef = ref<FormInstance>()

const validateForm = (form: FormInstance | undefined) => {
  if (!form) return
  form.validate((isVlalid: boolean, fields?: Values) => {
    console.log(isVlalid, fields)
  })
}

const handleBeforeUpload = (rawFile: UploadRawFile) => {
  // return false
  return true
}

const currentDate = ref(new Date())

const totalCount = 100
interface DataType {
  id: number
  name: string
  desc: string
  index: number
}
const listData: Array<DataType> = []

let index = 0
while (index++ !== totalCount) {
  listData.push({
    id: index,
    name: Random.name(),
    desc: Random.csentence(20, 120),
    index
  })
}

const items = ref(listData)
</script>

<template>
  <k-icon :color="'red'" :size="40">
    <AddCircle></AddCircle>
  </k-icon>
  <k-icon :color="'yellow'" :size="40">
    <AddCircle></AddCircle>
  </k-icon>
  <!-- 在使用树组件的时候，会传递一个树型的结构 -->

  {{ value }}
  <k-tree
    v-model:selected-keys="value"
    :data="data"
    :on-load="handleLoad"
    selectable
    show-checkbox
    :default-checked-keys="['40']"
  >
    <template #default="{ node }"> {{ node.key }} - {{ node.label }} </template>
  </k-tree>
  <!-- selectable意味着可以选择节点 multiple意味着可以多选节点 -->

  <!-- {{ check }}
  <k-checkbox
    v-model="check"
    :disabled="false"
    :indeterminate="true"
    label="节点"
    @change="handleChange"
  >
  </k-checkbox> -->

  <k-button
    size="medium"
    type="danger"
    :round="true"
    icon-placement="right"
    @click="handleClick"
    @mousedown="handleClick"
  >
    按钮
    <template #icon>
      <k-icon>
        <AddCircle></AddCircle>
      </k-icon>
    </template>
  </k-button>

  <!-- <k-input
    v-model="username"
    placeholder="请输入密码"
    show-password="true"
    :clearable="true"
    @blur="handleBlur"
    @focus="handleFocus"
  >
    <template #prepend> prepend </template>
    <template #prefixIcon>
      <k-icon>
        <AddCircle></AddCircle>
      </k-icon>
    </template>
    <template #sufixIcon>
      <k-icon>
        <AddCircle></AddCircle>
      </k-icon>
    </template>
    <template #append> append </template>
  </k-input> -->

  <k-form
    ref="formRef"
    :model="state"
    :rules="{
      username: {
        min: 6,
        max: 10,
        message: '用户名6-10位',
        trigger: ['change', 'blur']
      }
    }"
  >
    <k-form-item
      prop="username"
      :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
    >
      <k-input v-model="state.username" placeholder="请输入用户名" />
      <template #label> 用户名 </template>
    </k-form-item>

    <k-form-item
      prop="password"
      :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
    >
      <k-input
        v-model="state.password"
        placeholder="请输入密码"
        type="password"
      />
      <template #label>用户名</template>
    </k-form-item>
    <k-button
      a="1"
      b="2"
      size="medium"
      type="primary"
      :round="true"
      @click="validateForm(formRef)"
    >
      按钮
    </k-button>
  </k-form>

  <k-upload
    multiple
    :before-upload="handleBeforeUpload"
    action="http://localhost:4000/upload"
    drag
  >
    <k-button>点我上传</k-button>
  </k-upload>
  {{ currentDate }}
  <k-calendar v-model="currentDate">
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      </p>
    </template>
  </k-calendar>

  <!-- <k-virtual-scroll-list
    class="virtual-list"
    :data-sources="items"
    data-key="id"
    :keeps="30"
    :estimate-size="80"
    :data-component="(Item as DefineComponent<{}, {}, any>)"
  >
  </k-virtual-scroll-list> -->

  <hr />

  <k-row>
    <k-col :span="6" style="background: pink">111</k-col>
    <k-col :span="6" style="background: purple">222</k-col>
    <k-col :span="6" style="background: green">333</k-col>
  </k-row>
  <k-row :gutter="20">
    <k-col :span="8" style="background: pink">111</k-col>
    <k-col :span="8" style="background: purple">222</k-col>
    <k-col :span="8" style="background: green">333</k-col>
  </k-row>
  <div style="width: 80%; border: 3px red solid; margin: 0 auto">
    <k-row :gutter="20">
      <k-col :span="8" style="background: pink">111</k-col>
      <k-col :span="8" style="background: purple">222</k-col>
      <k-col :span="8" style="background: green">333</k-col>
    </k-row>
  </div>
  <div style="width: 80%; border: 3px red solid; margin: 0 auto">
    <k-row justify="space-around">
      <k-col :span="2" style="background: pink">111</k-col>
      <k-col :span="2" style="background: purple">222</k-col>
      <k-col :span="2" style="background: green">333</k-col>
    </k-row>
  </div>
</template>

<style lang="scss">
.virtual-list {
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  border: 3px solid red;
}
</style>
