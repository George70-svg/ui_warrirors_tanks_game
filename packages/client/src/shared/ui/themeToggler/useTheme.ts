import { useEffect, useState } from 'react'
import { darkTheme, lightTheme } from '../../../app/ui/theme-config'

type ThemeConfig = typeof darkTheme

export const useThemeTracker = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(lightTheme) // По умолчанию светлая тема

  useEffect(() => {
    // Проверяем наличие window перед обращением к localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('THEME_KEY')
      if (savedTheme === 'dark') {
        setCurrentTheme(darkTheme)
      } else {
        setCurrentTheme(lightTheme)
      }

      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'THEME_KEY') {
          setCurrentTheme(e.newValue === 'dark' ? darkTheme : lightTheme)
        }
      }

      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return currentTheme
}
