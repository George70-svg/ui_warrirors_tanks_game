import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import { commonPlugins } from './src/shared/config/commonConfig'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT),
  },
  define: {
    __PORT__: JSON.stringify(process.env.SERVER_PORT) || JSON.stringify('3001'),
    __HOST__:
      JSON.stringify(process.env.SERVER_HOST) || JSON.stringify('server'),
  },
  plugins: [...commonPlugins],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
