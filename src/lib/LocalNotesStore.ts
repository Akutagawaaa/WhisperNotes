import { Preferences } from '@capacitor/preferences';

export interface Note {
  id: string;
  title: string;
  content: string;
  drawingData?: string;
  themeId: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'whisper_notes_data';

export const LocalNotesStore = {
  // Get all notes from local storage
  async getAllNotes(): Promise<Note[]> {
    const { value } = await Preferences.get({ key: STORAGE_KEY });
    return value ? JSON.parse(value) : [];
  },

  // Save a new or existing note
  async saveNote(note: Note): Promise<void> {
    const notes = await this.getAllNotes();
    const index = notes.findIndex((n) => n.id === note.id);
    
    if (index !== -1) {
      notes[index] = { ...note, updatedAt: new Date().toISOString() };
    } else {
      notes.push({ ...note, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }

    await Preferences.set({
      key: STORAGE_KEY,
      value: JSON.stringify(notes),
    });
  },

  // Delete a note
  async deleteNote(id: string): Promise<void> {
    const notes = await this.getAllNotes();
    const updatedNotes = notes.filter((n) => n.id !== id);
    
    await Preferences.set({
      key: STORAGE_KEY,
      value: JSON.stringify(updatedNotes),
    });
  },

  // Clear all data (for testing)
  async clearAll(): Promise<void> {
    await Preferences.remove({ key: STORAGE_KEY });
  }
};
