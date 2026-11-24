import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DarkTheme, LightTheme } from '../theme/colors';

type ThemeType = 'dark' | 'light';

interface ThemeContextData {
  theme: ThemeType;
  colors: typeof DarkTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('dark'); // Mode sombre par défaut

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const colors = theme === 'dark' ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
