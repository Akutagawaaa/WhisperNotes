
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  updateNote: (id: string, note: Partial<Omit<Note, "id" | "createdAt" | "updatedAt">>) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
  isLoading: boolean;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const STORAGE_KEY = "ghibli_notes";

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load notes from localStorage on initial render
  useEffect(() => {
    const loadNotes = () => {
      try {
        const storedNotes = localStorage.getItem(STORAGE_KEY);
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error("Failed to load notes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes, isLoading]);

  const addNote = (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newNote: Note = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...note
    };

    setNotes(prevNotes => [newNote, ...prevNotes]);
  };

  const updateNote = (id: string, note: Partial<Omit<Note, "id" | "createdAt" | "updatedAt">>) => {
    setNotes(prevNotes => 
      prevNotes.map(n => 
        n.id === id 
          ? { ...n, ...note, updatedAt: new Date().toISOString() } 
          : n
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const getNote = (id: string) => {
    return notes.find(note => note.id === id);
  };

  const value = {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNote,
    isLoading
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
