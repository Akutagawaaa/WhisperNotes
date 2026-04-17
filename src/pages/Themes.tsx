
import { PageTransition } from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import ThemeSelector from "@/components/ThemeSelector";
import { useThemes } from "@/context/ThemesContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Moon, Sun, Monitor, Star } from "lucide-react";
import { Link } from "react-router-dom";
import GhibliSky from "@/components/GhibliSky";
import { motion } from "framer-motion";

const Themes = () => {
  const { currentTheme, setDarkMode } = useThemes();
  
  return (
    <PageTransition>
      <div className={`min-h-screen relative overflow-x-hidden`}>
        {/* Full screen background */}
        <div className="fixed inset-0 -z-10">
          <GhibliSky />
        </div>
        
        <Navbar />
        
        <main className="container mx-auto px-4 pt-36 pb-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-ghibli-gold/20">
                  <ArrowLeft className="h-6 w-6 text-ghibli-navy dark:text-ghibli-cream" />
                </Button>
              </Link>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-1 inline-block"
                >
                  <span className="ghibli-badge">
                     ✦ Personalization ✦
                  </span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
                  Themes & Appearance
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-ghibli-parchment/70 dark:bg-ghibli-midnight/60 p-2 rounded-full border border-ghibli-gold/20">
               <button
                 onClick={() => setDarkMode(false)}
                 className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-hand transition-all ${
                   !currentTheme.darkMode 
                     ? "bg-ghibli-gold text-ghibli-navy shadow-sm font-bold" 
                     : "text-ghibli-navy/60 dark:text-ghibli-cream/60 hover:text-ghibli-navy dark:hover:text-ghibli-cream"
                 }`}
               >
                 <Sun className="h-4 w-4" />
                 Light
               </button>
               <button
                 onClick={() => setDarkMode(true)}
                 className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-hand transition-all ${
                   currentTheme.darkMode 
                     ? "bg-ghibli-gold text-ghibli-navy shadow-sm font-bold" 
                     : "text-ghibli-navy/60 dark:text-ghibli-cream/60 hover:text-ghibli-navy dark:hover:text-ghibli-cream"
                 }`}
               >
                 <Moon className="h-4 w-4" />
                 Night
               </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="ghibli-card p-8 md:p-10 mb-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-ghibli-terracotta/10 flex items-center justify-center text-ghibli-terracotta">
                    <Palette className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
                      Theme Collection
                    </h2>
                    <p className="font-hand text-lg text-ghibli-navy/60 dark:text-ghibli-cream/60">
                      Gaze upon the different worlds you can manifest in your notebooks.
                    </p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-ghibli-gold/15">
                  <ThemeSelector />
                </div>
              </motion.div>
            </div>
            
            <div className="space-y-8">
              {/* Appearance Section */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="ghibli-card p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sun className="h-6 w-6 text-ghibli-gold" />
                  <h2 className="text-2xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
                    Visual Mode
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <p className="font-hand text-lg text-ghibli-navy/70 dark:text-ghibli-cream/70 mb-4">
                    Set the overall atmosphere of your studio:
                  </p>
                  
                  <button 
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all font-hand text-lg ${
                      !currentTheme.darkMode 
                        ? 'bg-ghibli-gold/10 border-ghibli-gold text-ghibli-navy font-bold shadow-sm' 
                        : 'border-ghibli-gold/10 text-ghibli-navy/60 dark:text-ghibli-cream/60 hover:bg-white/50 hover:border-ghibli-gold/30'
                    }`}
                    onClick={() => setDarkMode(false)}
                  >
                    <div className="flex items-center gap-3">
                      <Sun className="h-5 w-5" />
                      <span>Radiant Day</span>
                    </div>
                    {!currentTheme.darkMode && <Star className="h-4 w-4 fill-ghibli-gold text-ghibli-gold" />}
                  </button>
                  
                  <button 
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all font-hand text-lg ${
                      currentTheme.darkMode 
                        ? 'bg-ghibli-gold/10 border-ghibli-gold text-ghibli-navy font-bold shadow-sm' 
                        : 'border-ghibli-gold/10 text-ghibli-navy/60 dark:text-ghibli-cream/60 hover:bg-white/50 hover:border-ghibli-gold/30'
                    }`}
                    onClick={() => setDarkMode(true)}
                  >
                    <div className="flex items-center gap-3">
                      <Moon className="h-5 w-5" />
                      <span>Midnight Stars</span>
                    </div>
                    {currentTheme.darkMode && <Star className="h-4 w-4 fill-ghibli-gold text-ghibli-gold" />}
                  </button>
                  
                  <button 
                    className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl border-2 border-dashed border-ghibli-gold/20 text-ghibli-navy/60 dark:text-ghibli-cream/60 hover:bg-white/40 hover:border-ghibli-gold/40 transition-all font-hand text-lg"
                    onClick={() => {
                      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                      setDarkMode(prefersDark);
                    }}
                  >
                    <Monitor className="h-5 w-5" />
                    <span>Follow the Sun (System)</span>
                  </button>
                </div>
              </motion.div>
              
              {/* Preview UI Section */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="ghibli-card p-8"
              >
                <h3 className="text-2xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream mb-6">
                  Mini Preview
                </h3>
                <div className={`aspect-video rounded-2xl overflow-hidden relative shadow-inner border-4 border-ghibli-parchment transition-all duration-700 ${
                  currentTheme.darkMode ? 'bg-ghibli-midnight' : 'bg-ghibli-parchment/30'
                }`}>
                  <div className="absolute inset-0 p-5">
                    <div className={`h-4 w-24 rounded-full mb-3 transition-colors duration-500 ${
                      currentTheme.darkMode ? 'bg-ghibli-gold/20' : 'bg-ghibli-forest/20'
                    }`}></div>
                    <div className={`h-2.5 w-40 rounded-full mb-6 transition-colors duration-500 opacity-40 ${
                      currentTheme.darkMode ? 'bg-ghibli-cream' : 'bg-ghibli-navy'
                    }`}></div>
                    
                    <div className={`h-16 w-full rounded-2xl mb-4 transition-colors duration-500 border border-transparent ${
                      currentTheme.darkMode ? 'bg-ghibli-gold/5 border-ghibli-gold/10' : 'bg-white/60 shadow-sm border-ghibli-gold/10'
                    }`}></div>
                    
                    <div className="absolute bottom-5 right-5 h-10 w-10 rounded-full shadow-glow-warm flex items-center justify-center"
                      style={{ backgroundColor: currentTheme.accentColor }}
                    >
                       <Star className="h-5 w-5 text-white fill-white/20" />
                    </div>
                  </div>
                  
                  {/* Miniature decorative hill silhouette */}
                  <div className="absolute bottom-0 inset-x-0 h-8 opacity-20 pointer-events-none">
                     <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full fill-ghibli-forest">
                        <path d="M0 20 L0 12 Q25 4 50 12 Q75 14 100 8 L100 20 Z" />
                     </svg>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                   <p className="font-hand text-sm text-ghibli-navy/40 dark:text-ghibli-cream/40 italic">
                     * Your studio is a reflection of your heart. *
                   </p>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Themes;
