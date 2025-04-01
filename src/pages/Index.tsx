
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import NoteCard from "@/components/NoteCard";
import NoteEditor from "@/components/NoteEditor";
import EmptyState from "@/components/EmptyState";
import WeatherBackground from "@/components/WeatherBackground";
import NotebooksSection from "@/components/NotebooksSection"; 
import ThemeSelector from "@/components/ThemeSelector";
import { useNotes } from "@/context/NotesContext";
import { useThemes } from "@/context/ThemesContext";
import { Book, ArrowRight, Tag, Star, PenLine, Pencil, Palette, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const demoNotes = [
  {
    id: "1",
    title: "Adventure in the Sky Kingdom",
    content: "Today we flew through clouds shaped like whales. The air was fresh, and the sky stretched endlessly blue. I sketched a small map on parchment...",
    date: "2 days ago",
    tags: ["travel", "sky"]
  },
  {
    id: "2",
    title: "Magical Forest Encounter",
    content: "The forest was quiet except for the rustling of leaves. Tiny spirits peeked from behind the trees, curious but shy...",
    date: "1 week ago",
    tags: ["nature", "spirits"]
  },
  {
    id: "3",
    title: "Recipe: Grandma's Herbal Tea",
    content: "3 sprigs of lavender, dried mushrooms from the eastern forest, and a pinch of stardust...",
    date: "3 weeks ago",
    tags: ["recipe", "cozy"]
  }
];

const features = [
  {
    icon: <Book className="h-10 w-10 text-ghibli-gold" />,
    title: "Magical Journaling",
    description: "Transform your thoughts into beautifully animated notes inspired by the whimsical world of Studio Ghibli."
  },
  {
    icon: <Tag className="h-10 w-10 text-ghibli-terracotta" />,
    title: "Thematic Organization",
    description: "Categorize your notes with custom tags and browse through your collection with enchanting animations."
  },
  {
    icon: <Star className="h-10 w-10 text-ghibli-forest" />,
    title: "Dreamlike Experience",
    description: "Enjoy serene backgrounds and fluid transitions that make note-taking feel like a magical adventure."
  }
];

const Index = () => {
  const { notes, addNote } = useNotes();
  const { currentTheme } = useThemes();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'notebooks' | 'themes' | null>(null);

  const handleCreateNote = (note: { title: string; content: string; tags: string[] }) => {
    addNote(note);
    setIsEditorOpen(false);
  };

  return (
    <PageTransition>
      <div className={`min-h-screen relative overflow-x-hidden ${
        currentTheme.darkMode 
          ? "bg-gradient-to-b from-ghibli-navy to-gray-900 text-ghibli-cream" 
          : "bg-gradient-to-b from-ghibli-sky-light to-ghibli-beige"
      }`}>
        <div className="absolute inset-0 -z-10">
          <WeatherBackground className="h-full" />
        </div>
        
        <Navbar />
        
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 relative">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2">
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-4"
                  >
                    <span className="inline-block bg-ghibli-gold/30 text-ghibli-navy px-3 py-1 rounded-full text-sm font-medium">
                      Inspired by Studio Ghibli
                    </span>
                  </motion.div>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ghibli-navy leading-tight mb-6"
                  >
                    Capture Your <span className="text-ghibli-terracotta">Magical</span> Moments
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg text-ghibli-navy/80 mb-8 leading-relaxed max-w-xl"
                  >
                    A whimsical note-taking app that brings the enchanting world of Studio Ghibli to your everyday thoughts, reminders, and dreams.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button 
                      className="btn-ghibli group"
                      onClick={() => setIsEditorOpen(true)}
                    >
                      <span>Start Writing</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button variant="outline" className="btn-outline">
                      Explore Themes
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="lg:w-1/2 relative"
              >
                <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-lg mx-auto">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                    className="sm:mt-12"
                  >
                    <NoteCard
                      id="demo1"
                      title={demoNotes[0].title}
                      content={demoNotes[0].content}
                      date={demoNotes[0].date}
                      tags={demoNotes[0].tags}
                    />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 7, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <NoteCard
                      id="demo2"
                      title={demoNotes[1].title}
                      content={demoNotes[1].content}
                      date={demoNotes[1].date}
                      tags={demoNotes[1].tags}
                    />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
                    className="hidden sm:block sm:col-span-2 sm:w-2/3 sm:mx-auto"
                  >
                    <NoteCard
                      id="demo3"
                      title={demoNotes[2].title}
                      content={demoNotes[2].content}
                      date={demoNotes[2].date}
                      tags={demoNotes[2].tags}
                    />
                  </motion.div>
                </div>
                
                <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-br from-ghibli-gold via-ghibli-terracotta to-ghibli-forest rounded-full" />
              </motion.div>
            </div>
          </div>
        </section>
        
        {activeSection === 'notebooks' ? (
          <NotebooksSection />
        ) : activeSection === 'themes' ? (
          <section className="py-16 px-4 bg-white/60 dark:bg-ghibli-navy/60 backdrop-blur-sm">
            <div className="container mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setActiveSection(null)}
                  className="h-8 w-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="inline-block bg-ghibli-terracotta/10 text-ghibli-terracotta dark:bg-ghibli-terracotta/20 px-3 py-1 rounded-full text-sm font-medium">
                  Personalization
                </span>
              </div>
              <ThemeSelector />
            </div>
          </section>
        ) : (
          <>
            <section className="py-16 px-4 bg-white/60 dark:bg-ghibli-navy/60 backdrop-blur-sm">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                  <div>
                    <span className="inline-block bg-ghibli-forest/10 text-ghibli-forest dark:bg-ghibli-forest/20 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Organize Your World
                    </span>
                    <h2 className="text-3xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
                      Your Notebooks
                    </h2>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-4 md:mt-0"
                    onClick={() => setActiveSection('notebooks')}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    View All Notebooks
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-full overflow-hidden">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="cursor-pointer"
                    onClick={() => setActiveSection('notebooks')}
                  >
                    <div className="aspect-[3/4] flex items-center justify-center rounded-lg bg-gradient-to-br from-ghibli-navy/10 to-ghibli-navy/5 border-2 border-dashed border-ghibli-navy/20 hover:border-ghibli-navy/40 transition-colors">
                      <div className="text-center p-4">
                        <ArrowRight className="mx-auto h-8 w-8 text-ghibli-navy/40 dark:text-ghibli-cream/40 mb-2" />
                        <p className="text-ghibli-navy/70 dark:text-ghibli-cream/70 font-heading text-lg">
                          View all notebooks
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
            
            <section className="py-20 px-4">
              <div className="container mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-card overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-8 md:p-12">
                      <span className="inline-block bg-ghibli-terracotta/10 text-ghibli-terracotta px-3 py-1 rounded-full text-sm font-medium mb-4">
                        New Feature
                      </span>
                      <h2 className="text-3xl font-heading font-bold text-ghibli-navy mb-4">
                        Express Yourself with Artistic Notes
                      </h2>
                      <p className="text-ghibli-navy/80 mb-6">
                        Unleash your creativity with our new drawing tools. Sketch ideas, doodle in the margins, or create beautiful illustrations to accompany your notes.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link to="/draw">
                          <Button className="btn-ghibli group">
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Start Drawing</span>
                          </Button>
                        </Link>
                        <Button variant="outline" className="btn-outline">
                          Learn More
                        </Button>
                      </div>
                    </div>
                    <div className="md:w-1/2 bg-ghibli-beige relative min-h-[300px]">
                      <motion.div
                        className="absolute inset-0 bg-[url('https://placeholder.pics/svg/400x300/DEDEDE/555555/drawing%20canvas')] bg-center bg-cover"
                        animate={{ 
                          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                        }}
                        transition={{ 
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      <motion.div
                        className="absolute top-1/4 left-1/4 w-16 h-1 bg-ghibli-terracotta rounded-full origin-left"
                        animate={{ rotate: [0, 20, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute bottom-1/3 right-1/3 w-20 h-1 bg-ghibli-forest rounded-full origin-right"
                        animate={{ rotate: [0, -15, 5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="py-20 px-4">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                  <div>
                    <span className="inline-block bg-ghibli-terracotta/10 text-ghibli-terracotta px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Your Collection
                    </span>
                    <h2 className="text-3xl font-heading font-bold text-ghibli-navy">
                      Recent Notes
                    </h2>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-4 md:mt-0"
                    onClick={() => setIsEditorOpen(true)}
                  >
                    <PenLine className="mr-2 h-4 w-4" />
                    Create New Note
                  </Button>
                </div>
                
                {notes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.slice(0, 3).map((note) => (
                      <NoteCard
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        content={note.content}
                        date={new Date(note.updatedAt).toLocaleDateString()}
                        tags={note.tags}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    action={() => setIsEditorOpen(true)}
                  />
                )}
                
                {notes.length > 0 && (
                  <div className="mt-10 text-center">
                    <Button variant="outline" className="btn-outline">
                      View All Notes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </section>
            
            <section className="py-20 px-4 bg-ghibli-beige/80 dark:bg-ghibli-navy/40 backdrop-blur-sm">
              <div className="container mx-auto">
                <div className="text-center mb-16">
                  <span className="inline-block bg-ghibli-forest/10 text-ghibli-forest dark:bg-ghibli-forest/20 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Personalization
                  </span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream mb-6">
                    Themes & Appearance
                  </h2>
                  <p className="mt-2 text-ghibli-navy/70 dark:text-ghibli-cream/70 max-w-lg">
                    Customize your GhibliNotes experience with different themes inspired by the magical worlds of Studio Ghibli.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className={`h-40 md:h-60 rounded-xl shadow-md overflow-hidden relative cursor-pointer`}
                      onClick={() => setActiveSection('themes')}
                      style={{ 
                        background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg p-4">
                          <h3 className="font-heading text-2xl font-bold text-white drop-shadow-md">
                            {currentTheme.name}
                          </h3>
                          <p className="text-white/90 mt-1">{currentTheme.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="h-40 md:h-60 rounded-xl shadow-md overflow-hidden relative cursor-pointer bg-gradient-to-br from-ghibli-navy/10 to-ghibli-navy/5 border-2 border-dashed border-ghibli-navy/20 hover:border-ghibli-navy/40 transition-colors"
                      onClick={() => setActiveSection('themes')}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-4">
                          <Palette className="mx-auto h-12 w-12 text-ghibli-navy/50 dark:text-ghibli-cream/50 mb-3" />
                          <p className="text-ghibli-navy/70 dark:text-ghibli-cream/70 font-heading text-lg">
                            Explore more themes
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="py-20 px-4 bg-ghibli-beige/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                  <div>
                    <span className="inline-block bg-ghibli-terracotta/10 text-ghibli-terracotta dark:bg-ghibli-terracotta/20 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Magical Features
                    </span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream mb-6">
                      A Whimsical Note-Taking Experience
                    </h2>
                    <p className="text-ghibli-navy/70 max-w-2xl mx-auto">
                      Discover the enchanting features that make GhibliNotes a truly magical companion for capturing your thoughts and ideas.
                    </p>
                  </div>
                  <Button 
                    onClick={() => setActiveSection('themes')}
                    className="mt-4 md:mt-0"
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    Choose Theme
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow duration-300"
                    >
                      <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-ghibli-beige">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-heading font-semibold mb-3 text-ghibli-navy">
                        {feature.title}
                      </h3>
                      <p className="text-ghibli-navy/70">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
        
        <footer className="py-10 px-4 bg-ghibli-navy text-ghibli-beige">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-6 md:mb-0">
                <PenLine className="h-6 w-6 text-ghibli-gold" />
                <h2 className="text-2xl font-heading font-bold">WhisperNotes</h2>
              </div>
              <div className="flex gap-8">
                <a href="#" className="hover:text-ghibli-gold transition-colors">Home</a>
                <a href="#" className="hover:text-ghibli-gold transition-colors">About</a>
                <a href="#" className="hover:text-ghibli-gold transition-colors">Themes</a>
                <a href="#" className="hover:text-ghibli-gold transition-colors">Contact</a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-ghibli-beige/10 text-center text-sm text-ghibli-beige/60">
              <p>© {new Date().getFullYear()} WhisperNotes. A whimsical note-taking experience.</p>
            </div>
          </div>
        </footer>
        
        <AnimatePresence>
          {isEditorOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <div className="w-full max-w-3xl">
                <NoteEditor
                  onSave={handleCreateNote}
                  onCancel={() => setIsEditorOpen(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Index;
