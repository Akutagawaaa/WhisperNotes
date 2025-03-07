import React, { useState, useEffect } from "react";
import { fetchNotes } from "../api/notes";
import AddNote from "./AddNote";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  async function loadNotes() {
    const fetchedNotes = await fetchNotes();
    setNotes(fetchedNotes);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div>
      <h2>📜 Whispering Notes</h2>
      <AddNote onNoteAdded={loadNotes} />
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>🕰 {new Date(note.created_at).toLocaleString()}</small>
            <button onClick={() => handleDelete(note.id)}>🗑 Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
