import {defineConfig} from 'vite'
import Vue from '@vitejs/plugin-vue'
import {getLastCommit} from 'git-last-commit'

export default defineConfig(async () => {
  const latestCommitHash = await new Promise<string>((resolve) => {
    return getLastCommit((err, commit) => (err ? 'unknown' : resolve(commit.shortHash)))
  })
  return {
    base:'./',
    plugins: [
      Vue()
    ],
    define: {
      LATEST_COMMIT_HASH: JSON.stringify(
        latestCommitHash + (process.env.NODE_ENV === 'production' ? '' : ' (dev)')
      )
    },
    preview: {
      port: 5555
    }
  }
})