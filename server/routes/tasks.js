const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Get all tasks
router.get('/', auth, (req, res) => {
  db.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id], (err, tasks) => {
    if (err) return res.status(500).json(err);
    res.json(tasks);
  });
});

// Add a new task
router.post('/', auth, (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO tasks (user_id, title) VALUES (?, ?)', [req.user.id, title], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, title, completed: false });
  });
});

// Mark task complete
router.put('/:id', auth, (req, res) => {
  db.query('UPDATE tasks SET completed = 1 WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: 'Marked as complete' });
  });
});

// Delete task
router.delete('/:id', auth, (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: 'Task deleted' });
  });
});

module.exports = router;
