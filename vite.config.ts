import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    plugins: [vue()],
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
