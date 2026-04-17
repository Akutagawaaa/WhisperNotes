import express from "express";
import pool from "../db.js"; // Ensure correct relative path

const router = express.Router();

// Create a new note
router.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting note:", err);
    res.status(500).send("Server error");
  }
});

// Get all notes
router.get("/notes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).send("Server error");
  }
});

// Delete a note
router.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM notes WHERE id = $1", [id]);
    res.send("Note deleted");
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).send("Server error");
  }
});

export default router;
