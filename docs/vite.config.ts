import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import jsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [jsx(), DefineOptions()]
})
