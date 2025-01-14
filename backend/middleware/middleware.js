const jwt = require('jsonwebtoken');
const { User } = require('../models/user');  // Assuming you have a User model to fetch user details

// Secret key for JWT (it should be stored in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';  

// Middleware to authenticate the user by verifying the JWT token
const authMiddleware = async (req, res, next) => {
  const authorization = req.get('Authorization');
  
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  // The authorization header is expected to be in the form "Bearer <token>"
  const token = authorization.replace('Bearer ', '');
  
  try {
    // Verify the token
    const decodedToken = jwt.verify(token, JWT_SECRET);
    
    // Find the user by the ID decoded from the token
    const user = await User.findById(decodedToken.id);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach user to the request object so it can be used later in the resolvers
    req.user = user;
    
    // Continue to the next middleware or resolver
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Token is invalid or expired' });
  }
};

module.exports = authMiddleware;
