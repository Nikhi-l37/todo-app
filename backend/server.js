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
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    
    // Check if the origin matches our allowed patterns
    if (allowedOrigins.some(regex => regex.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// --- MIDDLEWARE ---
app.use(cors(corsOptions)); // Use our flexible CORS options
app.use(express.json());

// --- DATABASE CONNECTION & ROUTES ---
// ... the rest of your server.js file is perfect and does not need to change ...
// ...