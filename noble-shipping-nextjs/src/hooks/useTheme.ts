import { useEffect, useState } from 'react'
import { storage } from '@/lib/utils'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    const savedTheme = storage.get('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  const setThemeAndSave = (newTheme: Theme) => {
    setTheme(newTheme)
    storage.set('theme', newTheme)
  }

  const toggleTheme = () => {
    setThemeAndSave(theme === 'light' ? 'dark' : 'light')
  }

  return {
    theme,
    setTheme: setThemeAndSave,
    toggleTheme,
  }
}