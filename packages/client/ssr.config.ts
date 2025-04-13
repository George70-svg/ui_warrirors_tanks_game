import { defineConfig } from 'vite'
import * as path from 'path'
import commonPlugins from './src/shared/config/common.config'

export default defineConfig({
  plugins: [...commonPlugins],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'dist-ssr',
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
