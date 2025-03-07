
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import NotebookCover, { NewNotebookCover } from "@/components/NotebookCover";
import NotebookEditor from "@/components/NotebookEditor";
import { useNotebooks } from "@/context/NotebooksContext";
import { useNotes } from "@/context/NotesContext";
import NoteCard from "@/components/NoteCard";
import EmptyState from "@/components/EmptyState";
import { PenLine, ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const NotebooksSection = () => {
  const { notebooks, activeNotebook, setActiveNotebook, addNotebook, updateNotebook, deleteNotebook, getNotesForNotebook } = useNotebooks();
  const { notes, addNote } = useNotes();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
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
    // Logic for creating a note in the selected notebook would go here
    console.log("Create note in notebook:", activeNotebook);
  };

  return (
    <section className="py-16 px-4 bg-white/60 dark:bg-ghibli-navy/60 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            {activeNotebook ? (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setActiveNotebook(null)}
                  className="h-8 w-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <span className="inline-block bg-ghibli-forest/10 text-ghibli-forest dark:bg-ghibli-forest/20 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    Notebook
                  </span>
                  <h2 className="text-3xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
                    {activeNotebookData?.title || "Your Notebook"}
                  </h2>
                </div>
              </div>
            ) : (
              <>
                <span className="inline-block bg-ghibli-forest/10 text-ghibli-forest dark:bg-ghibli-forest/20 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Organize Your World
                </span>
                <h2 className="text-3xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
                  Your Notebooks
                </h2>
              </>
            )}
          </div>
          
          {activeNotebook && (
            <Button
              onClick={handleNewNoteInNotebook}
              className="mt-4 md:mt-0"
            >
              <PenLine className="mr-2 h-4 w-4" />
              New Note
            </Button>
          )}
        </div>
        
        {!activeNotebook ? (
          // Show all notebooks
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {notebooks.map(notebook => (
              <NotebookCover 
                key={notebook.id}
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
            ))}
            
            <NewNotebookCover 
              onClick={() => openEditor()}
            />
          </div>
        ) : (
          // Show notes in the active notebook
          <div>
            {notesInActiveNotebook.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <EmptyState
                action={handleNewNoteInNotebook}
                message="This notebook is empty. Create your first note!"
              />
            )}
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
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
    </section>
  );
};

export default NotebooksSection;
