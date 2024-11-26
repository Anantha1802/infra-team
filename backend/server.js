const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Set up PostgreSQL client
const pool = new Pool({
  user: "visys_dev",       // Replace with your DB username
  host: "52.66.196.233",
  database: "devdb",    // Replace with your DB name
  password: "dev@123",   // Replace with your DB password
  port: 5432,
});

// Get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tasks");
  }
});

// Add a new task
app.post("/api/tasks", async (req, res) => {
  const { task } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (task) VALUES ($1) RETURNING *",
      [task]
    );
    res.json({ tasks: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding task");
  }
});

// Delete a task by id
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [
      id,
    ]);
    const tasks = await pool.query("SELECT * FROM tasks");
    res.json({ tasks: tasks.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting task");
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
