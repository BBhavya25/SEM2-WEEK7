// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

// Middleware to check JWT
const authenticateJWT = (req, res, next) => {
  // Get token from the Authorization header (Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1];

  // If no token is provided, return unauthorized error
  if (!token) return res.status(403).json({ message: 'Unauthorized, token missing' });

  // Verify the JWT token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // If there's an error verifying the token, return invalid token error
      return res.status(403).json({ message: 'Invalid Token' });
    }

    // Attach the decoded userId to the request object so that other routes can access it
    req.userId = decoded.userId;
    
    // Proceed to the next middleware or route handler
    next();
  });
};

export default authenticateJWT;
