// middleware/auth.js
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
      
      // Add a user ID check against the token
      if (!decoded.userId) {
        return res.status(401).json({ message: 'Invalid token structure' });
      }
      
      // Force a new query each time rather than reusing a cached result
      const result = await query(
        'SELECT * FROM users WHERE user_id = $1',
        [decoded.userId]
      );
      
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
      
      // More explicit error handling
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