import { resolve } from 'path'
import { defineConfig, build } from 'vite'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import { dirname } from 'path'
import jsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'

const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const path = require('path')
const fs = require('fs-extra')
const fsExtra = require('fs-extra')
const version = require('../package.json').version
// 基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), jsx(), DefineOptions()]
})

// 入口文件
const entryFile = resolve(__dirname, './entry.ts')
// 组件目录
const componentsDir = path.resolve('../packages/components')
// 输出目录
const outputDir = resolve(__dirname, '../build')

// rollup配置
const rollupOptions = {
  external: ['vue'],
  output: {
    global: {
      vue: 'Vue'
    }
  }
}

// 生成package.json
const createPackageJson = name => {
  // 预设
  const fileStr = `{
    "name": "${name ? name : 'kalin-ui'}",
    "version": "${version}",
    "main": "${name ? 'index.umd.js' : 'kalin-ui.umd.js'}",
    "module": "${name ? 'index.umd.js' : 'kalin-ui.es.js'}",
    "author": "kalin",
    "description": "",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/KalinQAQ/kalin-ui.git"
    },
    "keywords": ["vue3", "组件库", "tsx", "UI"],
    "license": "ISC"
  }`
  if (name) {
    // 单个组件，输出对应的package.json
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8'
    )
  } else {
    // 全量
    fsExtra.outputFile(
      path.resolve(outputDir, 'package.json'),
      fileStr,
      'utf-8'
    )
  }
}

// 单组件按需构建
const buildSingle = async name => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(componentsDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd']
        },
        outDir: path.resolve(outputDir, name)
      }
    })
  )

  createPackageJson(name)
}

// 执行创建
// 全量构建
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: 'kalin-ui',
          fileName: 'kalin-ui',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )
  // 生成package.json
  createPackageJson()
}

const buildLib = async () => {
  await buildAll()

  // 按需打包
  fs.readdirSync(componentsDir)
    .filter(name => {
      // 只要目录不要文件，且里面包含index.ts
      const componentDir = path.resolve(componentsDir, name)
      const isDir = fs.lstatSync(componentDir).isDirectory()
      return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    .forEach(async name => {
      await buildSingle(name)
    })
}

buildLib()
