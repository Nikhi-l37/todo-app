// in controllers/user.controller.js

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <-- 1. Import jsonwebtoken

const userController = {

    
  register: async (req, res) => {
    try {
      // 1. Get username and password from the request body
      const { username, password } = req.body;

      // 2. Simple validation
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
      }

      // 3. Check if the user already exists in the database
      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
        return res.status(409).json({ message: "Username already taken." }); // 409 Conflict
      }

      // 4. Hash the password before saving
      const salt = await bcrypt.genSalt(10); // Generate a "salt"
      const hashedPassword = await bcrypt.hash(password, salt);

      // 5. Create a new user with the hashed password
      const newUser = new User({
        username,
        password: hashedPassword // Store the hashed password, NOT the original
      });

      // 6. Save the new user to the database
      await newUser.save();

      // 7. Send a success response (DO NOT send the password back)
      res.status(201).json({ 
        message: "User registered successfully",
        user: { id: newUser._id, username: newUser.username }
      });

    } catch (error) {
      console.error("--- REGISTER ERROR ---", error);
      res.status(500).json({ message: "Server error during registration.", error: error.message });
    }
  },

login: async (req, res) => {
    try {
      // 1. Get username and password from the request body
      const { username, password } = req.body;

      // 2. Simple validation
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
      }

      // 3. Find the user in the database by their username
      const user = await User.findOne({ username });
      if (!user) {
        // Use a generic error message for security. Don't tell the attacker if the username or password was wrong.
        return res.status(401).json({ message: "Invalid credentials" }); // 401 Unauthorized
      }

      // 4. Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // 5. If passwords match, create a JWT payload
      const payload = {
        user: {
          id: user.id // The payload should contain non-sensitive user info
        }
      };

      // 6. Sign the token with your secret key
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }, // Token expires in 1 hour
        (err, token) => {
          if (err) throw err;
          // 7. Send the token back to the client
          res.json({ 
            message: "Logged in successfully",
            token 
          });
        }
      );

    } catch (error) {
      console.error("--- LOGIN ERROR ---", error);
      res.status(500).json({ message: "Server error during login.", error: error.message });
    }
  }

};



module.exports = userController;