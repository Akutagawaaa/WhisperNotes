import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Using .env for security
  ssl: { rejectUnauthorized: false }, // Required for Neon free-tier
});

export default pool;
