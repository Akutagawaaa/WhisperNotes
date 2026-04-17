
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import NotebookCover, { NewNotebookCover } from "@/components/NotebookCover";
import NotebookEditor from "@/components/NotebookEditor";
import NoteEditor from "@/components/NoteEditor";
import { useNotebooks } from "@/context/NotebooksContext";
import { useNotes } from "@/context/NotesContext";
import NoteCard from "@/components/NoteCard";
import EmptyState from "@/components/EmptyState";
import { PenLine, ArrowLeft, Feather, BookOpen } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface NotebooksSectionProps {
  onClose?: () => void;
}

const NotebooksSection = ({ onClose }: NotebooksSectionProps) => {
  const { notebooks, activeNotebook, setActiveNotebook, addNotebook, updateNotebook, deleteNotebook, getNotesForNotebook, addNoteToNotebook } = useNotebooks();
  const { notes, addNote } = useNotes();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isNoteEditorOpen, setIsNoteEditorOpen] = useState(false);
  const [editingNotebook, setEditingNotebook] = useState<{ id?: string; title: string; description: string; cover: string } | null>(null);
  
  const activeNotebookData = activeNotebook ? notebooks.find(nb => nb.id === activeNotebook) : null;
  const notesInActiveNotebook = activeNotebook ? getNotesForNotebook(activeNotebook, notes) : [];

  const handleCreateNotebook = (data: { title: string; description: string; cover: string }) => {
    addNotebook(data);
    setIsEditorOpen(false);
    toast({
      title: "Notebook created",
      description: `"${data.title}" has been added to your collection`
    });
  };

  const handleUpdateNotebook = (data: { title: string; description: string; cover: string }) => {
    if (editingNotebook?.id) {
      updateNotebook(editingNotebook.id, data);
      toast({
        title: "Notebook updated",
        description: `"${data.title}" has been updated`
      });
    }
    setEditingNotebook(null);
  };

  const handleDeleteNotebook = () => {
    if (editingNotebook?.id) {
      deleteNotebook(editingNotebook.id);
      toast({
        title: "Notebook deleted",
        description: `The notebook has been removed from your collection`
      });
    }
    setEditingNotebook(null);
  };

  const openEditor = (notebook?: typeof editingNotebook) => {
    setEditingNotebook(notebook || { title: "", description: "", cover: "howl-sky" });
    setIsEditorOpen(true);
  };

  const handleNewNoteInNotebook = () => {
    setIsNoteEditorOpen(true);
  };

  const handleSaveNoteInNotebook = (data: { title: string; content: string; tags: string[] }) => {
    if (!activeNotebook) return;
    const created = addNote(data);
    addNoteToNotebook(activeNotebook, created.id);
    setIsNoteEditorOpen(false);
    toast({
      title: "Note added",
      description: `Saved to "${activeNotebookData?.title ?? "notebook"}"`
    });
  };

  return (
    <section className="py-24 px-4 ghibli-panel relative z-30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
          <div className="flex-1">
            {activeNotebook ? (
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setActiveNotebook(null)}
                  className="h-10 w-10 rounded-full hover:bg-ghibli-gold/20"
                >
                  <ArrowLeft className="h-6 w-6 text-ghibli-navy dark:text-ghibli-cream" />
                </Button>
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <span className="ghibli-badge mb-2">✦ Notebook ✦</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
                      {activeNotebookData?.title || "Your Notebook"}
                    </h2>
                  </motion.div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                {onClose && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-10 w-10 text-ghibli-navy dark:text-ghibli-cream hover:bg-ghibli-gold/20 rounded-full shrink-0"
                    aria-label="Back"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </Button>
                )}
                <div>
                   <span className="ghibli-badge mb-3">✦ Organize Your World ✦</span>
                   <h2 className="text-4xl md:text-5xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream leading-tight">
                    Your Notebooks
                  </h2>
                  <p className="mt-2 text-ghibli-navy/60 dark:text-ghibli-cream/60 font-hand text-lg">
                    Manage your magical themed collections.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {activeNotebook && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Button
                onClick={handleNewNoteInNotebook}
                className="btn-ghibli h-12 px-8 flex items-center gap-2.5 text-lg shadow-glow-warm"
              >
                <Feather className="h-5 w-5" />
                <span>New Note</span>
              </Button>
            </motion.div>
          )}
        </div>
        
        <div className="relative z-10 transition-all duration-500">
          {!activeNotebook ? (
            // Show all notebooks
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
              {notebooks.map((notebook, idx) => (
                <motion.div
                  key={notebook.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NotebookCover 
                    id={notebook.id}
                    title={notebook.title}
                    description={notebook.description}
                    cover={notebook.cover}
                    count={notebook.noteIds.length}
                    selected={activeNotebook === notebook.id}
                    onClick={() => setActiveNotebook(notebook.id)}
                    onEdit={() => openEditor({ 
                      id: notebook.id,
                      title: notebook.title,
                      description: notebook.description || "",
                      cover: notebook.cover
                    })}
                  />
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: notebooks.length * 0.05 }}
              >
                <NewNotebookCover 
                  onClick={() => openEditor()}
                />
              </motion.div>
            </div>
          ) : (
            // Show notes in the active notebook
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {notesInActiveNotebook.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {notesInActiveNotebook.map((note) => (
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
                <div className="py-12">
                  <EmptyState
                    action={handleNewNoteInNotebook}
                    actionText="Write a magical note!"
                  />
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Background decorations for section */}
      {!activeNotebook && (
        <div className="absolute top-10 right-10 opacity-5 pointer-events-none transition-all dark:opacity-10">
           <BookOpen className="w-64 h-64 text-ghibli-navy dark:text-ghibli-cream" />
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ghibli-navy/30 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="w-full max-w-xl">
              <NotebookEditor
                initialData={editingNotebook || undefined}
                onSave={editingNotebook?.id ? handleUpdateNotebook : handleCreateNotebook}
                onCancel={() => setIsEditorOpen(false)}
                onDelete={editingNotebook?.id ? handleDeleteNotebook : undefined}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNoteEditorOpen && activeNotebook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ghibli-navy/40 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="w-full max-w-3xl">
              <NoteEditor
                onSave={handleSaveNoteInNotebook}
                onCancel={() => setIsNoteEditorOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NotebooksSection;
