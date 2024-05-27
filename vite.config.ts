import { fileURLToPath } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const resolve = file => path.resolve(__dirname, file)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: /^foxy$/, replacement: resolve('./src/foxy.ts') },
      { find: /^@foxy/, replacement: fileURLToPath(new URL("./src", import.meta.url)) },
      { find: /^@stories/, replacement: fileURLToPath(new URL("./stories", import.meta.url)) },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
})
