
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type ThemeType = {
  id: string;
  name: string;
  description: string;
  image: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkMode?: boolean;
};

interface ThemesContextType {
  themes: ThemeType[];
  currentTheme: ThemeType;
  setCurrentTheme: (theme: ThemeType) => void;
  setDarkMode: (isDark: boolean) => void;
  isAmbientDark: boolean; // New property for visual contrast
  isLoading: boolean;
}

const GhibliThemes: ThemeType[] = [
  {
    id: "default",
    name: "Ghibli Meadows",
    description: "The default Ghibli-inspired theme with peaceful sky blues and warm beige tones",
    image: "howl-sky",
    primaryColor: "#A4C6E7",
    secondaryColor: "#F7EFE2",
    accentColor: "#E6C17A",
  },
  {
    id: "totoro-forest",
    name: "Totoro's Forest",
    description: "Lush greens and earth tones inspired by My Neighbor Totoro",
    image: "totoro-forest",
    primaryColor: "#8CAB93",
    secondaryColor: "#F7EFE2",
    accentColor: "#D4A28B",
  },
  {
    id: "spirited-bath",
    name: "Spirited Bathhouse",
    description: "Rich reds and golds inspired by the bathhouse in Spirited Away",
    image: "spirited-bath",
    primaryColor: "#D4A28B",
    secondaryColor: "#F7EFE2",
    accentColor: "#E6C17A",
  },
  {
    id: "kiki-delivery",
    name: "Kiki's Delivery",
    description: "Purple skies and soft pinks inspired by Kiki's Delivery Service",
    image: "kiki-delivery",
    primaryColor: "#E6BAB7",
    secondaryColor: "#F7EFE2",
    accentColor: "#A4C6E7",
  },
  {
    id: "ghibli-night",
    name: "Ghibli Night",
    description: "A soothing dark theme for nighttime journaling",
    image: "howl-sky",
    primaryColor: "#1F2937",
    secondaryColor: "#374151",
    accentColor: "#F8D078",
    darkMode: true,
  },
];

const ThemesContext = createContext<ThemesContextType | undefined>(undefined);
const STORAGE_KEY = "ghibli_theme";

const applyThemeToDocument = (theme: ThemeType) => {
  if (theme.darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  document.documentElement.style.setProperty('--theme-primary', theme.primaryColor);
  document.documentElement.style.setProperty('--theme-secondary', theme.secondaryColor);
  document.documentElement.style.setProperty('--theme-accent', theme.accentColor);
};

export const ThemesProvider = ({ children }: { children: ReactNode }) => {
  const [themes] = useState<ThemeType[]>(GhibliThemes);
  const [currentTheme, setCurrentThemeState] = useState<ThemeType>(GhibliThemes[0]);
  const [isAmbientDark, setIsAmbientDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the current environment should be "Dark" for contrast purposes
  const checkAmbientDarkness = (theme: ThemeType) => {
    const hour = new Date().getHours();
    const isNightTime = hour >= 20 || hour < 5;
    return theme.darkMode || isNightTime;
  };

  useEffect(() => {
    const darkness = checkAmbientDarkness(currentTheme);
    setIsAmbientDark(darkness);
    
    // Toggle a global helper class on body
    if (darkness) {
      document.body.classList.add('ambient-dark');
    } else {
      document.body.classList.remove('ambient-dark');
    }

    // Update every minute to catch hour transitions
    const id = setInterval(() => {
      const d = checkAmbientDarkness(currentTheme);
      if (d !== isAmbientDark) {
        setIsAmbientDark(d);
        document.body.classList.toggle('ambient-dark', d);
      }
    }, 60000);

    return () => clearInterval(id);
  }, [currentTheme]);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => {
    const loadTheme = () => {
      try {
        const storedTheme = localStorage.getItem(STORAGE_KEY);
        if (storedTheme) {
          const themeData = JSON.parse(storedTheme);
          const foundTheme = themes.find(t => t.id === themeData.id);
          if (foundTheme) {
            setCurrentThemeState(foundTheme);
            applyThemeToDocument(foundTheme);
          } else {
            applyThemeToDocument(GhibliThemes[0]);
          }
        } else {
          applyThemeToDocument(GhibliThemes[0]);
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
        applyThemeToDocument(GhibliThemes[0]);
      } finally {
        setIsLoading(false);
      }
    };
    loadTheme();
  }, [themes]);

  const setCurrentTheme = (theme: ThemeType) => {
    setCurrentThemeState(theme);
    applyThemeToDocument(theme);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: theme.id }));
  };

  const setDarkMode = (isDark: boolean) => {
    if (isDark) {
      const nightTheme = themes.find(t => t.darkMode) ?? themes[themes.length - 1];
      setCurrentTheme(nightTheme);
    } else {
      const lightTheme = currentTheme.darkMode
        ? themes.find(t => !t.darkMode) ?? GhibliThemes[0]
        : { ...currentTheme, darkMode: false };
      setCurrentTheme(lightTheme);
    }
  };

  const value = {
    themes,
    currentTheme,
    setCurrentTheme,
    setDarkMode,
    isAmbientDark,
    isLoading
  };

  return <ThemesContext.Provider value={value}>{children}</ThemesContext.Provider>;
};

export const useThemes = () => {
  const context = useContext(ThemesContext);
  if (context === undefined) {
    throw new Error("useThemes must be used within a ThemesProvider");
  }
  return context;
};
