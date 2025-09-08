// in routes/user.routes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Route for user registration
// POST /api/users/register
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;