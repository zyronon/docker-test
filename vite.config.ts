
import {defineConfig} from 'vite'
import Vue from '@vitejs/plugin-vue'
import {getLastCommit} from 'git-last-commit'

export default defineConfig(() => {
  return new Promise(resolve => {
    let latestCommitHash = ''
    getLastCommit((err, commit) => {
      if (!err) latestCommitHash = commit.shortHash
      resolve({
        plugins: [
          Vue()
        ],
        define: {
          LATEST_COMMIT_HASH: JSON.stringify(
            latestCommitHash + (process.env.NODE_ENV === 'production' ? '' : ' (dev)')
          )
        },
      })
    })
  })
})
