import vue from "@vitejs/plugin-vue"
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from "vitest/config"

export default defineConfig({
    plugins: [
        vue(),
        tsconfigPaths()
    ],
    test: {
        include: ['**/*.spec.ts'],
        globals: true,
        environment: 'jsdom'
    }
})
