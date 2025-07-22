import vue from '@vitejs/plugin-vue';
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
            { find: /^@origam\/(.*)/, replacement: resolve('./src/$1') },
            { find: /^@stories\/(.*)/, replacement: resolve('./stories/$1') },
            { find: /^@docs\/(.*)/, replacement: resolve('./docs/$1') },
            { find: /^@cypress\/(.*)/, replacement: resolve('./cypress/$1') }
        ],
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    }
});
