require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./server/routes/auth');
const taskRoutes = require('./server/routes/tasks');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
