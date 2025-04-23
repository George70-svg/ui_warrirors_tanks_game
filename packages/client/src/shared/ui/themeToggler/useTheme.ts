import { useEffect, useState } from 'react'
import { darkTheme, lightTheme } from '../../../app/ui/theme-config'

type ThemeConfig = typeof darkTheme

export const useThemeTracker = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(() => {
    const savedTheme = localStorage.getItem('THEME_KEY')
    return savedTheme === 'dark' ? darkTheme : lightTheme
  })

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'THEME_KEY') {
        setCurrentTheme(e.newValue === 'dark' ? darkTheme : lightTheme)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return currentTheme
}
