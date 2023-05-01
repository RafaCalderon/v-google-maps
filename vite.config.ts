import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    mkcert(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    cssCodeSplit: true,
    lib: {
      formats: ["es", "cjs"],
      name: 'VGoogleMaps',
      entry: "./src/index.ts",
      fileName: 'v-google-maps',
    },
    rollupOptions: {
      external: [
        "vue",
      ],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
