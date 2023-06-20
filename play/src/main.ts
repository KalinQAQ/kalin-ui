import { createApp } from 'vue'
import App from './App.vue'

import Icon from '@kalin-ui/components/icon'
import '@kalin-ui/theme-chalk/src/index.scss'
import Tree from '@kalin-ui/components/tree/index'
import Checkbox from '@kalin-ui/components/checkbox'

const plugins = [Icon, Tree, Checkbox]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
