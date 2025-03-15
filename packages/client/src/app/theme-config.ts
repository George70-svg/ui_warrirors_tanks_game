import { theme, ThemeConfig } from 'antd'
import { COLORS } from '../shared/ui/colors'

export const themeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorBgBase: COLORS.PRIMARY_BACKGROUND,
    colorIcon: COLORS.WHITE,
    colorPrimary: COLORS.WHITE,
    colorSplit: COLORS.BORDER_GRAY,
    colorText: COLORS.WHITE,
    colorTextPlaceholder: COLORS.WHITE,
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
      colorBgContainer: COLORS.PRIMARY_FADED,
      colorPrimary: COLORS.BLUE,
      colorPrimaryHover: COLORS.DARKBLUE,
      defaultBorderColor: COLORS.PRIMARY,
      defaultBg: COLORS.BLUE,
      paddingInline: 16,
      paddingBlock: 8,
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
