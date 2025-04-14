import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import { commonPlugins } from './src/shared/config/commonConfig'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  plugins: [...commonPlugins],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
