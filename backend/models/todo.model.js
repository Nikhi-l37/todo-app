// in models/todo.model.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {

       user: {
      type: mongoose.Schema.Types.ObjectId, // This is a special type for IDs
      required: true,
      ref: 'User' // This tells Mongoose this ID refers to a document in the 'User' collection
    },
    
    title: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends
    },
    completed: {
      type: Boolean,
      default: false, // New todos are not completed by default
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;