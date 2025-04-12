import React, { useEffect, useState } from 'react';
import {
  fetchTasks,
  addTask,
  completeTask,
  deleteTask
} from '../api/taskAPI';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const loadTasks = async () => {
    try {
      const res = await fetchTasks();
      setTasks(res.data);
    } catch (err) {
      console.error('Error loading tasks:', err.message);
    }
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      await addTask(title);
      setTitle('');
      loadTasks();
    } catch (err) {
      console.error('Error adding task:', err.message);
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeTask(id);
      loadTasks();
    } catch (err) {
      console.error('Error completing task:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error('Error deleting task:', err.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="home">
      <h2>Task Manager</h2>
      <input
        type="text"
        value={title}
        placeholder="Enter task"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            {!task.completed && <button onClick={() => handleComplete(task.id)}>✔</button>}
            <button onClick={() => handleDelete(task.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
