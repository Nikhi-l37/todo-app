// in backend/server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- FINAL, BULLETPROOF CORS CONFIGURATION ---
const allowedOrigins = [
  /https:\/\/todo-app-.*\.vercel\.app$/, // Regular expression to match all your Vercel subdomains
  /https:\/\/todo-.*\.vercel\.app$/      // A broader regex just in case
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(regex => regex.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// --- MIDDLEWARE ---
app.use(cors(corsOptions));
app.use(express.json());

// --- DATABASE CONNECTION & ROUTES ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('✅ MongoDB database connection established successfully');
});

const todoRoutes = require('./routes/todo.routes');
const userRoutes = require('./routes/user.routes');
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});