import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const commonPlugins = [
  react(),
  svgr({
    svgrOptions: {
      icon: true,
    },
  }),
]

export default commonPlugins
