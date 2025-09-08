// in server.js

const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('✅ MongoDB database connection established successfully');
});

// --- ROUTES ---
const todoRoutes = require('./routes/todo.routes');
app.use('/api/todos', todoRoutes); // For any request to /api/todos, use the todoRoutes file
const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes); // All user routes will start with /api/users


// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});


