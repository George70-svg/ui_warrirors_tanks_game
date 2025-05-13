import { theme, ThemeConfig } from 'antd'
import { COLORS } from './colors'

export const darkTheme: ThemeConfig = {
  cssVar: true,
  algorithm: theme.darkAlgorithm,
  token: {
    borderRadiusLG: 16,
    colorBgBase: COLORS.DARK_BACKGROUND,
    colorIcon: COLORS.WHITE,
    colorPrimary: COLORS.PRIMARY,
    colorSplit: COLORS.DARK_BORDER,
    colorText: COLORS.DARK_TEXT,
    colorTextPlaceholder: COLORS.GRAY,
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: 20,
    margin: 0,
  },
  components: {
    Alert: {
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
    Card: {
      colorBgContainer: COLORS.DARK_CARD_BG,
      bodyPadding: 40,
    },
    Divider: {
      colorSplit: COLORS.DARK_BORDER,
    },
    Input: {
      inputFontSizeLG: 14,
      colorBgContainer: COLORS.DARK_CARD_BG,
    },
    List: {
      itemPaddingSM: '8px 8px',
      descriptionFontSize: 8,
      avatarMarginRight: 8,
      colorBgContainer: COLORS.DARK_CARD_BG,
    },
    Typography: {
      fontSizeHeading1: 36,
      titleMarginTop: 0,
      titleMarginBottom: 0,
      fontSize: 14,
      colorText: COLORS.DARK_TEXT,
    },
  },
}

export const lightTheme: ThemeConfig = {
  cssVar: true,
  algorithm: theme.defaultAlgorithm,
  token: {
    borderRadiusLG: 16,
    colorBgBase: COLORS.LIGHT_BACKGROUND,
    colorIcon: COLORS.LIGHT_TEXT,
    colorPrimary: COLORS.PRIMARY,
    colorSplit: COLORS.LIGHT_BORDER,
    colorText: COLORS.LIGHT_TEXT,
    colorTextPlaceholder: COLORS.GRAY,
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: 20,
    margin: 0,
  },
  components: {
    Alert: {
      fontSize: 14,
    },
    Button: {
      colorBgContainer: COLORS.LIGHT_GRAY,
      colorPrimary: COLORS.BLUE,
      colorPrimaryHover: COLORS.DARKBLUE,
      defaultBorderColor: COLORS.PRIMARY,
      defaultBg: COLORS.BLUE,
      paddingInline: 16,
      paddingBlock: 8,
    },
    Card: {
      colorBgContainer: COLORS.LIGHT_CARD_BG,
      bodyPadding: 40,
    },
    Divider: {
      colorSplit: COLORS.LIGHT_BORDER,
    },
    Input: {
      inputFontSizeLG: 14,
      colorBgContainer: COLORS.LIGHT_BACKGROUND,
    },
    List: {
      itemPaddingSM: '8px 8px',
      descriptionFontSize: 8,
      avatarMarginRight: 8,
      colorBgContainer: COLORS.LIGHT_CARD_BG,
    },
    Typography: {
      fontSizeHeading1: 36,
      titleMarginTop: 0,
      titleMarginBottom: 0,
      fontSize: 14,
      colorText: COLORS.LIGHT_TEXT,
    },
  },
}
