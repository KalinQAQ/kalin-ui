import { createApp } from 'vue'
import App from './App.vue'

import Icon from '@kalin-ui/components/icon'
import '@kalin-ui/theme-chalk/src/index.scss'
import Tree from '@kalin-ui/components/tree/index'
import Checkbox from '@kalin-ui/components/checkbox'
import Button from '@kalin-ui/components/button'
import Input from '@kalin-ui/components/input'
import { FormItem, Form } from '@kalin-ui/components/Form'
import Upload from '@kalin-ui/components/upload'
import Calendar from '@kalin-ui/components/calendar'

const plugins = [
  Icon,
  Tree,
  Checkbox,
  Button,
  Input,
  FormItem,
  Form,
  Upload,
  Calendar
]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
