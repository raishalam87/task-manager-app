// src/api/taskAPI.js

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/tasks',
});

// Add token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 📦 Export all task-related calls

export const fetchTasks = () => API.get('/');
export const addTask = (title) => API.post('/', { title });
export const completeTask = (id) => API.put(`/${id}`);
export const deleteTask = (id) => API.delete(`/${id}`);
