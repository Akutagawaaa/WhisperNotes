
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type ThemeType = {
  id: string;
  name: string;
  description: string;
  image: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundImage?: string;
  darkMode?: boolean;
};

interface ThemesContextType {
  themes: ThemeType[];
  currentTheme: ThemeType;
  setCurrentTheme: (theme: ThemeType) => void;
  setDarkMode: (isDark: boolean) => void; // Added this method
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

export const ThemesProvider = ({ children }: { children: ReactNode }) => {
  const [themes] = useState<ThemeType[]>(GhibliThemes);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(GhibliThemes[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from localStorage on initial render
  useEffect(() => {
    const loadTheme = () => {
      try {
        const storedTheme = localStorage.getItem(STORAGE_KEY);
        if (storedTheme) {
          const themeData = JSON.parse(storedTheme);
          const foundTheme = themes.find(t => t.id === themeData.id);
          if (foundTheme) {
            setCurrentTheme(foundTheme);
            
            // Apply theme to document
            if (foundTheme.darkMode) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [themes]);

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTheme));
      
      // Apply theme to document
      if (currentTheme.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [currentTheme, isLoading]);

  // Add the setDarkMode method
  const setDarkMode = (isDark: boolean) => {
    setCurrentTheme({
      ...currentTheme,
      darkMode: isDark
    });
  };

  const value = {
    themes,
    currentTheme,
    setCurrentTheme,
    setDarkMode, // Add to context value
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
