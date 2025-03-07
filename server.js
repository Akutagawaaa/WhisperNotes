import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.js"; // Ensure correct path

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", notesRouter);

app.get("/", (req, res) => {
  res.send("🚀 WhisperNotes API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
