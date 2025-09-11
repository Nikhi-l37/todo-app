// in backend/server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS CONFIGURATION ---
// This is the most important part for connecting your live frontend and backend.
// We are creating a list of all the frontend URLs that are allowed to make requests to this backend.
const allowedOrigins = [
  'https://todo-app-brown-tau.vercel.app',
  'https://todo-5vzliwqus-nikhils-projects-060085b8.vercel.app',
  'https://todo-43jog28mp-nikhils-projects-060085b8.vercel.app'
  // You can add more Vercel URLs here if new ones are generated
];

const corsOptions = {
  origin: function (origin, callback) {
    // The 'origin' is the URL of the website making the request (e.g., your Vercel URL).
    // We check if this origin is in our list of allowed origins.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      // If it's in the list (or if the request has no origin, like from Postman), allow it.
      callback(null, true);
    } else {
      // If it's not in the list, block it.
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// --- MIDDLEWARE ---
app.use(cors(corsOptions)); // Use our specific CORS options
app.use(express.json());   // This lets our server understand JSON bodies

// --- DATABASE CONNECTION ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('✅ MongoDB database connection established successfully');
});

// --- ROUTES ---
// Import the route files
const todoRoutes = require('./routes/todo.routes');
const userRoutes = require('./routes/user.routes');

// Tell the app to use the route files for specific paths
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});