// in routes/todo.routes.js

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
// Is the import path correct? It should be ../middleware/auth.middleware
const authMiddleware = require('../middleware/auth.middleware');

// Is the middleware function placed here?
router.get('/', authMiddleware, todoController.getAllTodos);

router.post('/', authMiddleware, todoController.createTodo);

router.put('/:id', authMiddleware, todoController.updateTodo);

router.delete('/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;