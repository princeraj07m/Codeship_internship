const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all tasks
router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add task
router.post("/", (req, res) => {
  const { title } = req.body;
  db.query("INSERT INTO tasks (title) VALUES (?)", [title], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, title });
  });
});

// Delete task
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id = ?", [req.params.id], err => {
    if (err) throw err;
    res.json({ message: "Task deleted" });
  });
});

// Update task (mark complete)
router.put("/:id", (req, res) => {
  const { completed } = req.body;
  db.query("UPDATE tasks SET completed = ? WHERE id = ?", [completed, req.params.id], err => {
    if (err) throw err;
    res.json({ message: "Task updated" });
  });
});

module.exports = router;
