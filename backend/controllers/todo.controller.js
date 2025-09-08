// in controllers/todo.controller.js

const Todo = require('../models/todo.model');


const todoController = {
  getAllTodos: async (req, res) => {
    try {
      // --- THIS IS THE CRITICAL LINE ---
      // It MUST filter by the user ID attached to the request by the middleware.
      const todos = await Todo.find({ user: req.user.id }); 

      // If the line above looks like this, it's WRONG:
      // const todos = await Todo.find({}); // This gets ALL todos from ALL users.

      res.status(200).json(todos);
    } catch (error) {
      console.error("--- ERROR FETCHING TODOS ---", error);
      res.status(500).json({ message: 'Server error while fetching todos', error: error.message });
    }
  },

  // --- 2. UPDATE createTodo ---
  createTodo: async (req, res) => {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }
      const newTodo = new Todo({
        title,
        user: req.user.id // <-- ADD THIS LINE: Attach the user's ID
      });
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (error) {
      console.error("--- ERROR CREATING TODO ---", error);
      res.status(500).json({ message: 'Server error while creating todo', error: error.message });
    }
  },

  // --- 3. UPDATE updateTodo (FOR SECURITY) ---
  updateTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;
      
      // Find a todo by its ID AND make sure it belongs to the logged-in user
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: id, user: req.user.id }, // Compound condition
        { title, completed },
        { new: true }
      );

      if (!updatedTodo) {
        // This will now trigger if the todo doesn't exist OR it's not the user's todo
        return res.status(404).json({ message: 'Todo not found or user not authorized' });
      }
      res.status(200).json(updatedTodo);
    } catch (error) {
      console.error("--- ERROR UPDATING TODO ---", error);
      res.status(500).json({ message: 'Server error while updating todo', error: error.message });
    }
  },

  // --- 4. UPDATE deleteTodo (FOR SECURITY) ---
  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;

      // Find a todo by its ID AND make sure it belongs to the logged-in user before deleting
      const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });

      if (!deletedTodo) {
        return res.status(404).json({ message: 'Todo not found or user not authorized' });
      }
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error("--- ERROR DELETING TODO ---", error);
      res.status(500).json({ message: 'Server error while deleting todo', error: error.message });
    }
  },
};

module.exports = todoController;