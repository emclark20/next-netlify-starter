// pages/api/auth/login.js
import { query } from '../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Import the cookie package correctly
import { serialize } from 'cookie';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { emailOrUsername, password } = req.body;

    // Basic validation
    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: 'Email/username and password are required' });
    }

    // Check if input is email or username (simple validation)
    const isEmail = emailOrUsername.includes('@');
    
    // Find the user by email or username
    const result = await query(
      isEmail 
        ? 'SELECT * FROM users WHERE email = $1' 
        : 'SELECT * FROM users WHERE username = $1', 
      [emailOrUsername]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { 
        userId: user.user_id,
        email: user.email,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set the token as an HTTP-only cookie
    res.setHeader(
      'Set-Cookie',
      serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/',
      })
    );

    // Return user data (without the password)
    const { password: _, ...userWithoutPassword } = user;
    
    return res.status(200).json({
      message: 'Logged in successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}