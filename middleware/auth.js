// middleware/auth.js
import jwt from 'jsonwebtoken';
import { query } from '../lib/db';

// Enhanced middleware to verify JWT token with detailed logging
export const withAuth = (handler) => {
  return async (req, res) => {
    console.log('--------------------------------------------------');
    console.log(`Authentication middleware triggered for ${req.url}`);
    
    try {
      // Get token from cookies
      const token = req.cookies.token;
      console.log('Cookie content:', Object.keys(req.cookies).length ? 'Cookies present' : 'No cookies');
      
      // Log request headers for debugging (redact sensitive info in production)
      console.log('Request headers:', {
        host: req.headers.host,
        referer: req.headers.referer,
        'user-agent': req.headers['user-agent']?.substring(0, 50) + '...'
      });

      if (!token) {
        console.log('Authentication failed: No token found in cookies');
        return res.status(401).json({ message: 'Not authenticated' });
      }

      console.log('Token found, verifying JWT...');
      
      try {
        // Verify token with more detailed error handling
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('JWT verification succeeded for userId:', decoded.userId);
        
        if (!decoded.userId) {
          console.error('JWT missing userId claim:', decoded);
          return res.status(401).json({ message: 'Invalid token format' });
        }
        
        // Check if user exists in database
        console.log('Querying database for user:', decoded.userId);
        const result = await query('SELECT * FROM users WHERE user_id = $1', [decoded.userId]);
        
        if (result.rows.length === 0) {
          console.error(`User with ID ${decoded.userId} not found in database`);
          return res.status(401).json({ message: 'User not found' });
        }

        console.log(`User found: ${result.rows[0].username} (${result.rows[0].user_id})`);
        
        // Add user data to request object
        const user = result.rows[0];
        const { password, ...userWithoutPassword } = user;
        req.user = userWithoutPassword;
        
        console.log('Authentication successful, proceeding to handler');
        
        // Continue to the API route handler
        return handler(req, res);
      } catch (jwtError) {
        // Detailed JWT error handling
        console.error('JWT verification failed:', {
          error: jwtError.name,
          message: jwtError.message,
          token: token ? `${token.substring(0, 10)}...` : 'undefined'
        });
        
        // Check JWT secret presence (without revealing it)
        console.log('JWT_SECRET status:', process.env.JWT_SECRET ? 'Present' : 'Missing');
        
        if (jwtError.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid token' });
        }
        
        if (jwtError.name === 'TokenExpiredError') {
          return res.status(401).json({ 
            message: 'Token expired',
            expiredAt: jwtError.expiredAt
          });
        }
        
        return res.status(401).json({ message: `Token error: ${jwtError.message}` });
      }
    } catch (error) {
      // General error handling
      console.error('Auth middleware critical error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // Check database connection
      try {
        const dbCheck = await query('SELECT 1 as db_check');
        console.log('Database connection:', dbCheck.rows.length ? 'OK' : 'Error');
      } catch (dbError) {
        console.error('Database connection error:', dbError.message);
      }
      
      return res.status(500).json({ 
        message: 'Internal server error during authentication',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    } finally {
      console.log('Authentication middleware completed');
      console.log('--------------------------------------------------');
    }
  };
};

// Helper function to get the current user from the request
export const getCurrentUser = async (req) => {
  console.log('getCurrentUser called');
  
  try {
    const token = req.cookies.token;
    
    if (!token) {
      console.log('getCurrentUser: No token found');
      return null;
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('getCurrentUser: Token decoded for userId:', decoded.userId);
    
    const result = await query('SELECT * FROM users WHERE user_id = $1', [decoded.userId]);
    
    if (result.rows.length === 0) {
      console.log('getCurrentUser: User not found in database');
      return null;
    }
    
    const { password, ...userWithoutPassword } = result.rows[0];
    console.log('getCurrentUser: User found:', userWithoutPassword.username);
    return userWithoutPassword;
  } catch (error) {
    console.error('getCurrentUser error:', {
      message: error.message,
      name: error.name
    });
    return null;
  }
};