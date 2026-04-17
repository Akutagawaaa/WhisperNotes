
import { motion } from "framer-motion";
import { Check, Moon, Sun, Palette } from "lucide-react";
import { useThemes, ThemeType } from "@/context/ThemesContext";

const ThemeSelector = () => {
  const { themes, currentTheme, setCurrentTheme } = useThemes();

  const handleThemeChange = (theme: ThemeType) => {
    setCurrentTheme(theme);
  };

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            whileHover={{ y: -6, rotate: 0.5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`
              relative overflow-hidden rounded-2xl cursor-pointer border-2 transition-all duration-500 group
              ${theme.id === currentTheme.id 
                ? 'border-ghibli-gold shadow-glow-warm scale-[1.02]' 
                : 'border-transparent shadow-soft hover:border-ghibli-gold/30'}
            `}
            onClick={() => handleThemeChange(theme)}
          >
            {/* Background Image / Gradient */}
            <div className="h-40 relative overflow-hidden">
               <img 
                 src={`/covers/${theme.image}.png`} 
                 alt={theme.name}
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
               <div className={`absolute inset-0 transition-opacity duration-500 ${
                 theme.darkMode ? 'bg-black/40 group-hover:bg-black/30' : 'bg-white/10 group-hover:bg-transparent'
               }`} />
               
               {/* Overlay Gradient for readability */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
               
               <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-white mb-0.5" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {theme.name}
                      </h3>
                      <p className="text-white/80 text-sm font-hand max-w-[200px]" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                        {theme.description}
                      </p>
                    </div>
                    
                    {/* Selected indicator */}
                    {theme.id === currentTheme.id ? (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-ghibli-gold rounded-full p-2 shadow-lg"
                      >
                        <Check className="h-5 w-5 text-ghibli-navy" />
                      </motion.div>
                    ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:border-white/80 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>
               </div>
               
               {/* Theme mood indicator icon */}
               <div className="absolute right-4 top-4 bg-black/30 backdrop-blur-sm rounded-full p-2 border border-white/10">
                 {theme.darkMode ? (
                   <Moon className="h-4 w-4 text-ghibli-amber" />
                 ) : (
                   <Sun className="h-4 w-4 text-ghibli-gold" />
                 )}
               </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 p-5 ghibli-card border-dashed border-ghibli-gold/30 bg-ghibli-gold/5 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-ghibli-gold/20 flex items-center justify-center text-ghibli-gold shrink-0">
           <Palette className="h-6 w-6" />
        </div>
        <p className="text-sm text-ghibli-navy/60 dark:text-ghibli-cream/60 font-hand italic leading-relaxed">
          Each theme transforms the light, mood, and colors of your whimsical journey. 
          Pick the world that resonates most with your thoughts today.
        </p>
      </motion.div>
    </div>
  );
};

export default ThemeSelector;
