import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import { commonPlugins } from './src/shared/config/commonConfig'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  define: {
    __PORT__: JSON.stringify('3000'),
    __HOST__: JSON.stringify('localhost'),
  },
  plugins: [...commonPlugins],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
