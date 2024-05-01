import { defineConfig, PluginOption } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
import { fileURLToPath, URL } from 'node:url'
import { getLastCommit } from 'git-last-commit'
import VueMacros from 'unplugin-vue-macros/vite'

const lifecycle = process.env.npm_lifecycle_event

export default defineConfig(async () => {
  // const latestCommitHash = await new Promise<string>((resolve) => {
  //   return getLastCommit((err, commit) => (err ? 'unknown' : resolve(commit.shortHash)))
  // })
  return {
    base: './',
    envDir: 'env',
    plugins: [
      VueMacros({
        plugins: {
          vue: Vue(),
          vueJsx: VueJsx() // if needed
        }
        // betterDefine: true,
        // reactivityTransform: {
        //   exclude: [/node_modules/, /jQuery\.js/]
        // }
      }),
      // Vue(),
      // VueJsx(),
      lifecycle === 'report' ? (visualizer({ open: false }) as any as PluginOption) : null,
      importToCDN({
        modules: [
          {
            name: 'vue',
            var: 'Vue',
            path: `https://lib.baomitu.com/vue/3.4.21/vue.runtime.global.prod.min.js`
          },
          {
            name: 'vue-router',
            var: 'VueRouter',
            path: 'https://lib.baomitu.com/vue-router/4.3.0/vue-router.global.prod.min.js'
          },
          {
            name: 'vue-demi',
            var: 'VueDemi',
            path: 'https://lib.baomitu.com/vue-demi/0.14.7/index.iife.min.js'
          },
          {
            name: 'mockjs',
            var: 'Mock',
            path: 'https://lib.baomitu.com/Mock.js/1.0.1-beta3/mock-min.js'
          }
        ]
      })
      // viteCompression({
      //   verbose: false,
      //   disable: false,
      //   threshold: 10240,
      //   algorithm: 'brotliCompress',
      // }),
      // viteCompression({
      //   verbose: false,
      //   disable: false,
      //   algorithm: 'gzip',
      //   threshold: 10240,
      // }),
      // viteImagemin({
      //   gifsicle: {
      //     optimizationLevel: 7,
      //     interlaced: false,
      //   },
      //   optipng: {
      //     optimizationLevel: 7,
      //   },
      //   mozjpeg: {
      //     quality: 20,
      //   },
      //   pngquant: {
      //     quality: [0.8, 0.9],
      //     speed: 4,
      //   },
      //   svgo: {
      //     plugins: [
      //       {
      //         name: 'removeViewBox',
      //       },
      //       {
      //         name: 'removeEmptyAttrs',
      //         active: false,
      //       },
      //     ],
      //   },
      // }),
    ],

    esbuild: {
      // drop: ['console', 'debugger']
    },
    server: {
      port: 3000,
      open: true,
      host: '0.0.0.0',
      fs: {
        strict: false
      }
    }
  }
})
