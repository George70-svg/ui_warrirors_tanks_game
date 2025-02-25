import type { ThemeConfig } from 'antd'

export const themeConfig: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#00b96b',
    borderRadius: 4,
  },
  components: {
    Button: {
      primaryColor: '#00b96b',
      algorithm: true,
    },
    Card: {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    },
  },
}
