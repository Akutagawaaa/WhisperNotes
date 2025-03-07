
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Moon, Sun } from "lucide-react";
import { useThemes, ThemeType } from "@/context/ThemesContext";

const ThemeSelector = () => {
  const { themes, currentTheme, setCurrentTheme } = useThemes();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(currentTheme);

  const handleThemeChange = (theme: ThemeType) => {
    setSelectedTheme(theme);
    setCurrentTheme(theme);
  };

  return (
    <div className="py-8">
      <h2 className="text-3xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream mb-6">
        Choose Your Theme
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`
              relative overflow-hidden rounded-xl cursor-pointer border-2 transition-all
              ${theme.id === selectedTheme.id 
                ? 'border-ghibli-gold shadow-lg scale-[1.02]' 
                : 'border-transparent'}
            `}
            onClick={() => handleThemeChange(theme)}
          >
            <div 
              className={`h-32 overflow-hidden flex items-center justify-center p-6`}
              style={{ 
                background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                color: theme.darkMode ? '#FFF' : '#1F2937'
              }}
            >
              <div className="z-10 text-center">
                <h3 className="text-xl font-heading font-bold mb-1">
                  {theme.name}
                </h3>
                <p className="text-sm opacity-80">
                  {theme.description}
                </p>
              </div>
              
              {/* Theme mood indicator */}
              <div className="absolute right-3 top-3">
                {theme.darkMode ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </div>
              
              {/* Selected indicator */}
              {theme.id === selectedTheme.id && (
                <div className="absolute right-2 bottom-2 bg-ghibli-gold rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8">
        <p className="text-sm text-ghibli-navy/60 dark:text-ghibli-cream/60 italic">
          Themes will affect colors, backgrounds, and the overall mood of your notebooks.
          Select the one that best matches your journaling vibe!
        </p>
      </div>
    </div>
  );
};

export default ThemeSelector;
