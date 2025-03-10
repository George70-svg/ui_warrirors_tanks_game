import { theme, ThemeConfig } from 'antd'
import { COLORS } from '../shared/ui/colors'

export const themeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: COLORS.WHITE,
    colorText: COLORS.WHITE,
    colorBgBase: COLORS.PRIMARY_BACKGROUND,
    colorSplit: COLORS.BORDER_GRAY,
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: 20,
    margin: 0,
  },
  components: {
    Typography: {
      fontSizeHeading1: 36,
      titleMarginTop: 10,
      titleMarginBottom: 10,
      fontSize: 14,
    },
    Button: {
      defaultBorderColor: COLORS.PRIMARY,
      colorBgContainer: COLORS.PRIMARY_FADED,
      paddingInline: 16,
      paddingBlock: 8,
      defaultBg: COLORS.BLUE,
      colorPrimary: COLORS.BLUE,
      colorPrimaryHover: COLORS.DARKBLUE,
    },
    Input: {
      inputFontSizeLG: 14,
    },
    Alert: {
      fontSize: 14,
    },
    Divider: {
      colorSplit: COLORS.WHITE,
    },
    List: {
      itemPaddingSM: '8px 8px',
      descriptionFontSize: 8,
      avatarMarginRight: 8,
    },
  },
}
