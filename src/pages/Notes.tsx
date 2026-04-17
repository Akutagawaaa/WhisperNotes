
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import NoteCard from "@/components/NoteCard";
import NoteEditor from "@/components/NoteEditor";
import EmptyState from "@/components/EmptyState";
import { useNotes } from "@/context/NotesContext";
import { useThemes } from "@/context/ThemesContext";
import { PlusCircle, Tag, Search, Filter, Feather } from "lucide-react";
import GhibliSky from "@/components/GhibliSky";

const Notes = () => {
  const { notes, addNote } = useNotes();
  const { currentTheme } = useThemes();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get all unique tags from notes
  const allTags = Array.from(
    new Set(
      notes.flatMap(note => note.tags)
    )
  );
  
  // Filter notes based on search and tag
  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchTerm === "" || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === null || 
      note.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });
  
  const handleCreateNote = (note: { title: string; content: string; tags: string[] }) => {
    addNote(note);
    setIsEditorOpen(false);
  };
  
  return (
    <PageTransition>
      <div className={`min-h-screen relative overflow-x-hidden`}>
        {/* Full screen background */}
        <div className="fixed inset-0 -z-10">
          <GhibliSky />
        </div>
        
        <Navbar />
        
        <main className="container mx-auto px-4 pt-36 pb-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-2 inline-block"
              >
                <span className="ghibli-badge">
                   ✦ Your Collection ✦
                </span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
                My Notes
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ghibli-navy/40 dark:text-ghibli-cream/40 group-focus-within:text-ghibli-gold transition-colors" />
                <input
                  type="text"
                  placeholder="Search your thoughts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full sm:w-[220px] md:w-[280px] rounded-full border border-ghibli-gold/20 bg-ghibli-parchment/60 dark:bg-ghibli-midnight/60 text-ghibli-navy dark:text-ghibli-cream placeholder:text-ghibli-navy/30 dark:placeholder:text-ghibli-cream/30 focus:bg-white dark:focus:bg-ghibli-midnight focus:border-ghibli-gold/60 focus:ring-4 focus:ring-ghibli-gold/10 outline-none transition-all font-hand"
                />
              </div>
              
              <Button 
                onClick={() => setIsEditorOpen(true)}
                className="btn-ghibli flex items-center gap-2 h-11 px-6 shadow-glow-warm"
              >
                <Feather className="h-4 w-4" />
                <span>New Note</span>
              </Button>
            </div>
          </div>
          
          {allTags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 flex flex-wrap gap-2.5 items-center"
            >
              <div className="flex items-center gap-2 mr-2 text-ghibli-navy/50 dark:text-ghibli-cream/50 font-hand text-sm">
                <Filter className="h-4 w-4" />
                <span>Filter:</span>
              </div>
              
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-hand transition-all border ${
                  selectedTag === null 
                    ? "bg-ghibli-gold text-ghibli-navy border-ghibli-gold shadow-sm font-semibold" 
                    : "bg-white/40 dark:bg-ghibli-navy/40 border-ghibli-gold/20 text-ghibli-navy/70 dark:text-ghibli-cream/70 hover:bg-white/60 hover:border-ghibli-gold/40"
                }`}
              >
                All
              </button>
              
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-hand transition-all border flex items-center gap-1.5 ${
                    selectedTag === tag 
                      ? "bg-ghibli-gold text-ghibli-navy border-ghibli-gold shadow-sm font-semibold" 
                      : "bg-white/40 dark:bg-ghibli-navy/40 border-ghibli-gold/20 text-ghibli-navy/70 dark:text-ghibli-cream/70 hover:bg-white/60 hover:border-ghibli-gold/40"
                  }`}
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </button>
              ))}
            </motion.div>
          )}
          
          <AnimatePresence mode="popLayout">
            {filteredNotes.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    content={note.content}
                    date={new Date(note.updatedAt).toLocaleDateString()}
                    tags={note.tags}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <EmptyState 
                  action={() => {
                    if (searchTerm || selectedTag) {
                      setSearchTerm("");
                      setSelectedTag(null);
                    } else {
                      setIsEditorOpen(true);
                    }
                  }}
                  actionText={searchTerm || selectedTag ? "Clear filters and try again" : "Create your first note"}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <AnimatePresence>
          {isEditorOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ghibli-navy/30 backdrop-blur-md flex items-center justify-center p-4"
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

export default Notes;
