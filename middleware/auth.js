// middleware/auth.js
import jwt from 'jsonwebtoken';
import { query } from '../lib/db';

// Middleware to verify JWT token
export const withAuth = (handler) => {
  return async (req, res) => {
    try {
      // Get token from cookies
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user exists in database
      const result = await query('SELECT * FROM users WHERE user_id = $1', [decoded.userId]);
      
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Add user data to request object
      const user = result.rows[0];
      const { password, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;

      // Continue to the API route handler
      return handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};

// Helper function to get the current user from the request
export const getCurrentUser = async (req) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return null;
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await query('SELECT * FROM users WHERE user_id = $1', [decoded.userId]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const { password, ...userWithoutPassword } = result.rows[0];
    return userWithoutPassword;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};