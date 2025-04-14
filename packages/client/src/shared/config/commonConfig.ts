import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export const commonPlugins = [
  react(),
  svgr({
    svgrOptions: {
      icon: true,
    },
  }),
]
