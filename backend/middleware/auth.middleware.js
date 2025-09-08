// in middleware/auth.middleware.js

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // 1. Get the token from the request header
  const token = req.header('x-auth-token');

  // 2. Check if there's no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // 3. Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. If the token is valid, the 'decoded' payload will be available.
    // We add the user information from the payload to the request object.
    req.user = decoded.user;

    // 5. Pass the request to the next piece of middleware or the final controller.
    next();
  } catch (error) {
    // 6. If the token is not valid (e.g., expired, wrong secret), an error will be thrown.
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = authMiddleware;