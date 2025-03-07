import { theme, ThemeConfig } from 'antd'
import { COLORS } from '../shared/ui/colors'

export const themeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: COLORS.WHITE,
    colorBgBase: COLORS.PRIMARY_BACKGROUND,
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: 20,
    margin: 0,
  },
  components: {
    Typography: {
      fontSizeHeading1: 36,
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Button: {
      defaultBorderColor: COLORS.PRIMARY,
      colorBgContainer: COLORS.PRIMARY_FADED,
      paddingInline: 16,
      paddingBlock: 8,
    },
  },
}
