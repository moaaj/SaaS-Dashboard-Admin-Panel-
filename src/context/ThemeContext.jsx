import { createContext, useContext, useState, useEffect } from 'react';
import { defaultThemes } from '../config/themeConfig';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch (e) {
        return defaultThemes.light;
      }
    }
    return defaultThemes.light;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme.mode);

    // Apply theme colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });

    // Apply theme fonts
    document.documentElement.style.setProperty('--font-primary', theme.fonts.primary);
    document.documentElement.style.setProperty('--font-secondary', theme.fonts.secondary);

    // Apply theme spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--spacing-${key}`, value);
    });

    // Apply theme border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--radius-${key}`, value);
    });

    // Apply theme shadows
    Object.entries(theme.shadows).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--shadow-${key}`, value);
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      mode: prevTheme.mode === 'light' ? 'dark' : 'light',
      colors: prevTheme.mode === 'light' ? defaultThemes.dark.colors : defaultThemes.light.colors,
    }));
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 