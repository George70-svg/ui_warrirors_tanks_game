// ThemeSwitcher.tsx
import { Switch } from 'antd'
import { useThemeTracker } from './useTheme'
import { darkTheme } from '../../../app/ui/theme-config'

export const ThemeSwitcher = () => {
  const theme = useThemeTracker()
  const isDarkMode = theme === darkTheme

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    localStorage.setItem('THEME_KEY', newTheme)
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'THEME_KEY',
        newValue: newTheme,
      })
    )
  }

  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      checkedChildren="🌙"
      unCheckedChildren="☀️"
    />
  )
}
