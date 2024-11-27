const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Set up PostgreSQL client
const pool = new Pool({
  user: "visys_dev",        // Replace with your PostgreSQL username
  host: "52.66.196.233",        // Replace with your PostgreSQL host (use your DB IP if not local)
  database: "devdb",      // Replace with your DB name
  password: "dev@123",// Replace with your DB password
  port: 5432,               // Default PostgreSQL port
});

// Add a new task
app.post("/api/tasks", async (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).send("Task content is required");
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (task) VALUES ($1) RETURNING *", 
      [task]
    );
    res.status(201).json(result.rows[0]); // Return the newly added task
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding task");
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
