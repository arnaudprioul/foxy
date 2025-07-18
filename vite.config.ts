import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'

const resolve = (file: string) => path.resolve(__dirname, file)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
        {find: /^origam$/, replacement: resolve('./src/origam.ts')},
        {find: /^@origam/, replacement: fileURLToPath(new URL("./src", import.meta.url))},
      { find: /^@stories/, replacement: fileURLToPath(new URL("./stories", import.meta.url)) },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
})
