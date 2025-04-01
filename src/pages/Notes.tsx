
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
import { PlusCircle, Tag, Search, Filter } from "lucide-react";
import WeatherBackground from "@/components/WeatherBackground";

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
      <div className={`min-h-screen relative ${
        currentTheme.darkMode 
          ? "bg-gradient-to-b from-ghibli-navy to-gray-900 text-ghibli-cream" 
          : "bg-gradient-to-b from-ghibli-sky-light to-ghibli-beige"
      }`}>
        <div className="absolute inset-0 -z-10">
          <WeatherBackground className="h-full" />
        </div>
        
        <Navbar />
        
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <span className="inline-block bg-ghibli-gold/30 text-ghibli-navy dark:text-ghibli-cream px-3 py-1 rounded-full text-sm font-medium mb-2">
                Collection
              </span>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
                My Notes
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full sm:w-[200px] md:w-[250px] rounded-full bg-white/80 dark:bg-ghibli-navy/50 focus:ring-2 focus:ring-ghibli-gold/30 outline-none transition-all"
                />
              </div>
              
              <Button 
                onClick={() => setIsEditorOpen(true)}
                className="btn-ghibli"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Note
              </Button>
            </div>
          </div>
          
          {allTags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className={selectedTag === null 
                  ? "bg-ghibli-gold text-ghibli-navy hover:bg-ghibli-gold/80" 
                  : "bg-white/50 dark:bg-ghibli-navy/50"
                }
              >
                All
              </Button>
              
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className={selectedTag === tag 
                    ? "bg-ghibli-gold text-ghibli-navy hover:bg-ghibli-gold/80" 
                    : "bg-white/50 dark:bg-ghibli-navy/50"
                  }
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Button>
              ))}
            </div>
          )}
          
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
          ) : (
            <EmptyState 
              action={() => setIsEditorOpen(true)}
              actionText={searchTerm || selectedTag ? "Clear filters and try again" : "Create your first note"}
            />
          )}
        </main>
        
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

export default Notes;
