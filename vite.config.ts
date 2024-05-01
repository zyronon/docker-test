import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {getLastCommit} from "git-last-commit";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  // const latestCommitHash = await new Promise<string>((resolve) => {
  //   return getLastCommit((err, commit) => (err ? 'unknown' : resolve(commit.shortHash)))
  // })
  return {
    base: './',
    envDir: 'env',
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
