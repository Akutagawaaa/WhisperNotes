import pool from "./db.js"; // Import database connection

async function createTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ Notes table created successfully!");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  } finally {
    client.release();
  }
}

// Run the function
createTable();
