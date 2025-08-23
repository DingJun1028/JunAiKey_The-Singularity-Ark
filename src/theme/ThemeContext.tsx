import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { fallbackTheme } from './themes';
import type { Theme, Palette } from '../types';
import { generateThemeFromPrompt } from '../services/geminiService';
import { Layouts } from 'react-grid-layout';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isLoading: boolean;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  toggleTheme: () => void;
  updateLayout: (newLayouts: Layouts) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const MASTER_PROMPT = "A sacred codex of light. A high fantasy theme based on ancient scrolls, divine magic, and enlightenment. Use a palette of parchment, aged gold, lapis lazuli, and regal purple. Fonts should be elegant and readable, like Playfair Display for headings and Lora for body. All vocabulary should be trilingual (English, Traditional Chinese, Pinyin) and fit the divine theme. Also generate a dynamic dashboard layout.";
const THEME_STORAGE_KEY = 'junaikey-theme-v1';
const THEME_MODE_STORAGE_KEY = 'junaikey-theme-mode-v1';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
      try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        return savedTheme ? JSON.parse(savedTheme) : fallbackTheme;
      } catch (error) {
        console.error("Could not load theme from localStorage", error);
        return fallbackTheme;
      }
  });
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [isLoading, setIsLoading] = useState(false); // Changed: Non-blocking UI

  useEffect(() => {
    // Set initial theme mode from storage or system preference
    const savedMode = localStorage.getItem(THEME_MODE_STORAGE_KEY) as ThemeMode | null;
    if (savedMode) {
      setThemeMode(savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeMode('dark');
    }
  }, []);

  useEffect(() => {
    // This effect runs in the background to generate a theme on first load
    // without blocking the UI.
    const generateInitialTheme = async () => {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!savedTheme && process.env.API_KEY) {
        try {
          console.log("No saved theme found. Generating new AI theme in background.");
          const newTheme = await generateThemeFromPrompt(MASTER_PROMPT);
          setTheme(newTheme);
        } catch (error) {
          console.error("Error fetching dynamic theme in background, using fallback.", error);
          // Fallback is already set, so no action needed.
        }
      }
    };

    generateInitialTheme();
  }, []);
  
  useEffect(() => {
    // Apply active palette to the DOM
    const activePalette: Palette = theme.palette[themeMode] || theme.palette.light;
    const root = document.documentElement;
    Object.keys(activePalette).forEach(key => {
      root.style.setProperty(`--color-${key}`, activePalette[key]);
    });
    
    document.body.style.backgroundImage = theme.images?.background || 'none';
  }, [theme, themeMode]);
  
  useEffect(() => {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
        localStorage.setItem(THEME_MODE_STORAGE_KEY, themeMode);
    } catch (error) {
        console.error("Could not save theme to localStorage", error);
    }
  }, [theme, themeMode]);

  const updateLayout = useCallback((newLayouts: Layouts) => {
      setTheme(currentTheme => ({
          ...currentTheme,
          layout: newLayouts,
      }))
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);
  
  const value = useMemo(() => ({
    theme,
    themeMode,
    isLoading,
    setTheme,
    toggleTheme,
    updateLayout,
  }), [theme, themeMode, isLoading, setTheme, toggleTheme, updateLayout]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};