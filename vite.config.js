import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import path from 'path';
import { defineConfig } from 'vite';
import commonjs from "vite-plugin-commonjs";
import tsconfigPaths from "vite-tsconfig-paths";
var resolve = function (file) { return path.resolve(__dirname, file); };
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), commonjs(), tsconfigPaths()],
    resolve: {
        alias: [
            { find: /^origam$/, replacement: resolve('./src/origam.ts') },
            { find: /^@/, replacement: fileURLToPath(new URL("./src", import.meta.url)) },
            { find: /^@stories/, replacement: fileURLToPath(new URL("./stories", import.meta.url)) }
        ],
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    }
});
