
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import NoteCard from "@/components/NoteCard";
import NoteEditor from "@/components/NoteEditor";
import EmptyState from "@/components/EmptyState";
import GhibliSky from "@/components/GhibliSky";
import NotebooksSection from "@/components/NotebooksSection"; 
import ThemeSelector from "@/components/ThemeSelector";
import NotebookCover, { NOTEBOOK_COVERS } from "@/components/NotebookCover";
import { useNotes } from "@/context/NotesContext";
import { useThemes } from "@/context/ThemesContext";
import { Book, ArrowRight, Tag, Star, PenLine, Pencil, Palette, ArrowLeft, Feather } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    icon: <Book className="h-8 w-8 text-ghibli-gold" />,
    title: "Magical Journaling",
    description: "Transform your thoughts into beautifully animated notes inspired by the whimsical world of Studio Ghibli.",
    illustration: "https://placeholder.pics/svg/200x200/F2E8D5/5A7A5E/book"
  },
  {
    icon: <Tag className="h-8 w-8 text-ghibli-terracotta" />,
    title: "Thematic Organization",
    description: "Categorize your notes with custom tags and browse through your collection with enchanting animations.",
    illustration: "https://placeholder.pics/svg/200x200/F2E8D5/D4A28B/tags"
  },
  {
    icon: <Star className="h-8 w-8 text-ghibli-forest" />,
    title: "Dreamlike Experience",
    description: "Enjoy serene backgrounds and fluid transitions that make note-taking feel like a magical adventure.",
    illustration: "https://placeholder.pics/svg/200x200/F2E8D5/8CAB93/stars"
  }
];

const WavyDivider = ({ flipped = false, top = false }: { flipped?: boolean, top?: boolean }) => (
  <div className={`w-full pointer-events-none ${top ? "absolute top-0 -translate-y-[99%]" : "absolute bottom-0 translate-y-[99%]"} z-20`}>
    <svg 
      viewBox="0 0 1440 48" 
      className={`w-full h-12 fill-white/80 dark:fill-ghibli-midnight/80 backdrop-blur-sm ${flipped ? "scale-x-[-1]" : ""}`}
      preserveAspectRatio="none"
    >
      <path d="M0 48 C240 48 480 0 720 0 C960 0 1200 48 1440 48 V48 H0 Z" />
    </svg>
  </div>
);

const Index = () => {
  const { notes, addNote } = useNotes();
  const { currentTheme } = useThemes();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'notebooks' | 'themes' | null>(null);

  useEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.hash, location.pathname]);

  const handleCreateNote = (note: { title: string; content: string; tags: string[] }) => {
    addNote(note);
    setIsEditorOpen(false);
  };

  return (
    <PageTransition>
      <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-700`}>
        {/* Full screen background */}
        <div className="fixed inset-0 -z-50">
          <GhibliSky />
        </div>
        
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-24 md:pt-44 md:pb-40 px-4 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="lg:w-1/2 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="mb-6 inline-block"
                >
                  <span className="ghibli-badge">
                    ✦ Inspired by Studio Ghibli ✦
                  </span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream leading-tight mb-8"
                >
                  Capture Your <span className="ink-highlight">Magical</span> Moments
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl text-ghibli-navy/70 dark:text-ghibli-cream/70 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-hand"
                >
                  A whimsical note-taking app that brings the enchanting world of Studio Ghibli to your everyday thoughts, reminders, and dreams.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                >
                  <Button 
                    className="btn-ghibli group flex items-center gap-2 text-lg px-8 py-4"
                    onClick={() => setIsEditorOpen(true)}
                  >
                    <Feather className="h-5 w-5" />
                    <span>Start Writing</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                    <Link to="/themes">Explore Themes</Link>
                  </Button>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="lg:w-1/2 relative"
              >
                {/* Floating Note Bulletin Board Effect */}
                <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-lg mx-auto">
                  <motion.div
                    animate={{ 
                      y: [0, -12, 0],
                      rotate: [-1, 1, -1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
                    animate={{ 
                      y: [0, -16, 0],
                      rotate: [1, -1, 1]
                    }}
                    transition={{ duration: 7, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
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
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [-0.5, 0.5, -0.5]
                    }}
                    transition={{ duration: 5, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden sm:block sm:col-span-2 sm:w-3/4 sm:mx-auto"
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
                
                {/* Decorative glow */}
                <div className="absolute inset-0 -z-10 blur-[100px] opacity-20 bg-gradient-to-br from-ghibli-gold via-ghibli-terracotta to-ghibli-forest rounded-full" />
              </motion.div>
            </div>
          </div>
          
          <WavyDivider />
        </section>
        
        {activeSection === 'notebooks' ? (
          <NotebooksSection onClose={() => setActiveSection(null)} />
        ) : activeSection === 'themes' ? (
          <section className="py-24 px-4 ghibli-panel relative z-30">
            <div className="container mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setActiveSection(null)}
                  className="h-10 w-10 rounded-full hover:bg-ghibli-gold/20"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <div>
                  <span className="ghibli-badge mb-1">Personalization</span>
                  <h2 className="text-3xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
                    Choose Your World
                  </h2>
                </div>
              </div>
              <ThemeSelector />
            </div>
            <WavyDivider />
          </section>
        ) : (
          <>
            {/* Notebooks Teaser */}
            <section className="py-24 px-4 ghibli-panel relative z-30">
              <div className="container mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                  <div className="max-w-xl">
                    <span className="ghibli-badge mb-3">Organize Your World</span>
                    <h2 className="text-4xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream mb-4">
                      Thematic Notebooks
                    </h2>
                    <p className="font-hand text-lg text-ghibli-navy/70 dark:text-ghibli-cream/70">
                      Gather your thoughts into beautifully bound collections inspired by the magic of Ghibli cinema.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="btn-outline mt-6 md:mt-0"
                    onClick={() => setActiveSection('notebooks')}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    View All Notebooks
                  </Button>
                </div>
                
                {/* Notebooks Fanned-out Stack Teaser */}
                <div className="relative h-[320px] md:h-[400px] flex justify-center py-10">
                  <div className="relative w-full max-w-2xl flex justify-center">
                    {NOTEBOOK_COVERS.slice(0, 3).map((cover, idx) => (
                      <motion.div
                        key={cover.id}
                        className="absolute w-44 md:w-56 cursor-pointer"
                        style={{ zIndex: 10 - idx }}
                        initial={{ 
                          x: (idx - 1) * 40,
                          rotate: (idx - 1) * 5,
                          y: Math.abs(idx - 1) * 10
                        }}
                        whileHover={{ 
                          x: (idx - 1) * 180,
                          rotate: (idx - 1) * 10,
                          y: -20,
                          scale: 1.05,
                          zIndex: 50
                        }}
                        transition={{ type: "spring", stiffness: 100 }}
                        onClick={() => setActiveSection('notebooks')}
                      >
                        <NotebookCover
                          id={`teaser-${idx}`}
                          title={cover.name}
                          cover={cover.id}
                          count={5 + idx * 3}
                        />
                      </motion.div>
                    ))}
                    
                    {/* View all card overlay */}
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden lg:block"
                      initial={{ opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      animate={{ opacity: 1 }}
                    >
                      <button 
                        onClick={() => setActiveSection('notebooks')}
                        className="w-16 h-16 rounded-full bg-ghibli-gold border-4 border-white dark:border-ghibli-midnight flex items-center justify-center shadow-card text-ghibli-navy hover:bg-ghibli-amber transition-colors"
                      >
                         <ArrowRight className="h-8 w-8" />
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
              <WavyDivider />
            </section>
            
            {/* Artistic Note Feature */}
            <section className="py-24 px-4 relative z-10">
              <div className="container mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="ghibli-card overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                      <span className="ghibli-badge mb-4 w-fit">New Journey</span>
                      <h2 className="text-4xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream mb-6">
                        Express Yourself with Artistic Notes
                      </h2>
                      <p className="font-hand text-lg text-ghibli-navy/70 dark:text-ghibli-cream/70 mb-8 leading-relaxed">
                        Unleash your creativity with our new drawing tools. Sketch ideas, doodle in the margins, or create beautiful illustrations to accompany your notes.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Link to="/draw">
                          <Button className="btn-ghibli group">
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Start Drawing</span>
                          </Button>
                        </Link>
                        <Button variant="outline" className="btn-outline" asChild>
                          <Link to="/draw">Learn More</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="md:w-1/2 bg-ghibli-forest/10 relative min-h-[400px]">
                      {/* Animated drawing canvas preview */}
                      <div className="absolute inset-0 p-8">
                        <div className="w-full h-full rounded-lg bg-white/40 border-2 border-dashed border-ghibli-ink/10 flex items-center justify-center relative overflow-hidden">
                           <motion.div
                            className="w-full h-full bg-[url('https://placeholder.pics/svg/600x400/F2E8D5/5A7A5E/art')] bg-cover bg-center opacity-40"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 15, repeat: Infinity }}
                           />
                           <motion.div
                            className="absolute top-1/4 left-1/4 w-32 h-0.5 bg-ghibli-terracotta rounded-full shadow-sm"
                            animate={{ width: ["0%", "40%", "20%", "60%"], opacity: [0, 1, 0.8, 1, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                           />
                           <motion.div
                            className="absolute top-1/2 right-1/4 w-0.5 h-32 bg-ghibli-forest rounded-full shadow-sm"
                            animate={{ height: ["0%", "30%", "10%", "50%"], opacity: [0, 1, 0.7, 1, 0] }}
                            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                           />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
            
            {/* Recent Notes Section */}
            <section className="py-24 px-4 relative z-10">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                  <div>
                    <span className="ghibli-badge mb-3">Your Collection</span>
                    <h2 className="text-4xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
                      Recent Notes
                    </h2>
                  </div>
                  <Button 
                    variant="outline" 
                    className="btn-outline mt-6 md:mt-0"
                    onClick={() => setIsEditorOpen(true)}
                  >
                    <PenLine className="mr-2 h-4 w-4" />
                    Create New Note
                  </Button>
                </div>
                
                {notes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {notes.slice(0, 3).map((note) => (
                      <NoteCard
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        content={note.content}
                        date={new Date(note.updatedAt).toLocaleDateString()}
                        tags={note.tags}
                        onClick={() => navigate("/notes")}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    action={() => setIsEditorOpen(true)}
                  />
                )}
                
                {notes.length > 0 && (
                  <div className="mt-14 text-center">
                    <Button variant="outline" className="btn-outline group h-12 px-8" asChild>
                      <Link to="/notes" className="flex items-center">
                        View All Notes
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </section>
            
            {/* Features / About Section */}
            <section id="about" className="py-24 px-4 ghibli-panel relative z-30">
              <WavyDivider top />
              <div className="container mx-auto pt-10">
                <div className="text-center mb-16">
                  <span className="ghibli-badge mb-4">Magical Features</span>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream mb-6">
                    A Whimsical Journal Companion
                  </h2>
                  <p className="font-hand text-xl text-ghibli-navy/60 dark:text-ghibli-cream/60 max-w-2xl mx-auto">
                    Discover the enchanting features that make WhisperNotes a truly magical companion for capturing your dreams and ideas.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="feature-card"
                    >
                      <div className="mb-6 rounded-2xl w-16 h-16 flex items-center justify-center bg-ghibli-gold/20 text-ghibli-gold">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-4 text-ghibli-navy dark:text-ghibli-cream">
                        {feature.title}
                      </h3>
                      <p className="font-sans text-ghibli-navy/70 dark:text-ghibli-cream/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
        
        {/* Footer */}
        <footer id="contact" className="py-16 px-4 bg-ghibli-navy dark:bg-black text-ghibli-beige relative z-40">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-ghibli-gold flex items-center justify-center text-ghibli-navy">
                  <PenLine className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-heading font-bold">WhisperNotes</h2>
              </div>
              
              <nav className="flex flex-wrap justify-center gap-10" aria-label="Footer">
                <Link to="/" className="font-hand text-lg hover:text-ghibli-gold transition-colors">Home</Link>
                <Link to="/#about" className="font-hand text-lg hover:text-ghibli-gold transition-colors">About</Link>
                <Link to="/themes" className="font-hand text-lg hover:text-ghibli-gold transition-colors">Themes</Link>
                <Link to="/draw" className="font-hand text-lg hover:text-ghibli-gold transition-colors">Draw</Link>
              </nav>

              <div className="flex gap-4">
                 {/* Social dots as soot sprites */}
                 {[1,2,3].map(i => (
                    <div key={i} className="w-4 h-4 rounded-full bg-ghibli-gold/20 hover:bg-ghibli-gold transition-colors cursor-pointer" />
                 ))}
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 text-center font-hand text-ghibli-beige/40">
              <p>© {new Date().getFullYear()} WhisperNotes. Hand-crafted with Studio Ghibli magic.</p>
            </div>
          </div>
        </footer>
        
        {/* Editor Modal Overlay */}
        <AnimatePresence>
          {isEditorOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-ghibli-navy/30 backdrop-blur-md flex items-center justify-center p-4"
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
