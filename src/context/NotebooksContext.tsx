
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Note } from "./NotesContext";

export interface Notebook {
  id: string;
  title: string;
  description?: string;
  cover: string;
  createdAt: string;
  updatedAt: string;
  noteIds: string[];
}

interface NotebooksContextType {
  notebooks: Notebook[];
  activeNotebook: string | null;
  setActiveNotebook: (id: string | null) => void;
  addNotebook: (notebook: Omit<Notebook, "id" | "createdAt" | "updatedAt" | "noteIds">) => void;
  updateNotebook: (id: string, notebook: Partial<Omit<Notebook, "id" | "createdAt">>) => void;
  deleteNotebook: (id: string) => void;
  getNotebook: (id: string) => Notebook | undefined;
  addNoteToNotebook: (notebookId: string, noteId: string) => void;
  removeNoteFromNotebook: (notebookId: string, noteId: string) => void;
  getNotesForNotebook: (notebookId: string, notes: Note[]) => Note[];
  isLoading: boolean;
}

const NotebooksContext = createContext<NotebooksContextType | undefined>(undefined);

const STORAGE_KEY = "ghibli_notebooks";

export const NotebooksProvider = ({ children }: { children: ReactNode }) => {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [activeNotebook, setActiveNotebook] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load notebooks from localStorage on initial render
  useEffect(() => {
    const loadNotebooks = () => {
      try {
        const storedNotebooks = localStorage.getItem(STORAGE_KEY);
        if (storedNotebooks) {
          setNotebooks(JSON.parse(storedNotebooks));
        } else {
          // Create default notebooks if none exist
          const defaultNotebooks: Notebook[] = [
            {
              id: "daily",
              title: "Daily Journal",
              description: "Your everyday thoughts and reflections",
              cover: "howl-sky",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              noteIds: []
            },
            {
              id: "recipes",
              title: "Recipe Collection",
              description: "Your favorite recipes and culinary ideas",
              cover: "kiki-delivery",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              noteIds: []
            },
            {
              id: "travel",
              title: "Travel Memories",
              description: "Documenting your adventures",
              cover: "totoro-forest",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              noteIds: []
            }
          ];
          setNotebooks(defaultNotebooks);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotebooks));
        }
      } catch (error) {
        console.error("Failed to load notebooks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotebooks();
  }, []);

  // Save notebooks to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notebooks));
    }
  }, [notebooks, isLoading]);

  const addNotebook = (notebook: Omit<Notebook, "id" | "createdAt" | "updatedAt" | "noteIds">) => {
    const now = new Date().toISOString();
    const newNotebook: Notebook = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      noteIds: [],
      ...notebook
    };

    setNotebooks(prevNotebooks => [...prevNotebooks, newNotebook]);
  };

  const updateNotebook = (id: string, notebook: Partial<Omit<Notebook, "id" | "createdAt">>) => {
    setNotebooks(prevNotebooks => 
      prevNotebooks.map(n => 
        n.id === id 
          ? { ...n, ...notebook, updatedAt: new Date().toISOString() } 
          : n
      )
    );
  };

  const deleteNotebook = (id: string) => {
    setNotebooks(prevNotebooks => prevNotebooks.filter(notebook => notebook.id !== id));
    if (activeNotebook === id) {
      setActiveNotebook(null);
    }
  };

  const getNotebook = (id: string) => {
    return notebooks.find(notebook => notebook.id === id);
  };

  const addNoteToNotebook = (notebookId: string, noteId: string) => {
    setNotebooks(prevNotebooks => 
      prevNotebooks.map(notebook => 
        notebook.id === notebookId 
          ? { 
              ...notebook, 
              noteIds: notebook.noteIds.includes(noteId) 
                ? notebook.noteIds 
                : [...notebook.noteIds, noteId],
              updatedAt: new Date().toISOString()
            } 
          : notebook
      )
    );
  };

  const removeNoteFromNotebook = (notebookId: string, noteId: string) => {
    setNotebooks(prevNotebooks => 
      prevNotebooks.map(notebook => 
        notebook.id === notebookId 
          ? { 
              ...notebook, 
              noteIds: notebook.noteIds.filter(id => id !== noteId),
              updatedAt: new Date().toISOString()
            } 
          : notebook
      )
    );
  };

  const getNotesForNotebook = (notebookId: string, notes: Note[]) => {
    const notebook = getNotebook(notebookId);
    if (!notebook) return [];
    return notes.filter(note => notebook.noteIds.includes(note.id));
  };

  const value = {
    notebooks,
    activeNotebook,
    setActiveNotebook,
    addNotebook,
    updateNotebook,
    deleteNotebook,
    getNotebook,
    addNoteToNotebook,
    removeNoteFromNotebook,
    getNotesForNotebook,
    isLoading
  };

  return <NotebooksContext.Provider value={value}>{children}</NotebooksContext.Provider>;
};

export const useNotebooks = () => {
  const context = useContext(NotebooksContext);
  if (context === undefined) {
    throw new Error("useNotebooks must be used within a NotebooksProvider");
  }
  return context;
};
