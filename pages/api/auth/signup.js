// pages/api/auth/signup.js
import { query } from '../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, firstName, lastName, username } = req.body;

    // Basic validation
    if (!email || !password || !firstName || !lastName || !username) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists (by email or username)
    const userCheck = await query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (userCheck.rows.length > 0) {
      // Check which one exists to provide a specific error
      const existingUser = userCheck.rows[0];
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already in use' });
      } else {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user
    const result = await query(
      `INSERT INTO users
       (first_name, last_name, email, username, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING user_id, first_name, last_name, email, username, created_at`,
      [firstName, lastName, email, username, hashedPassword]
    );

    // Get the newly created user
    const newUser = result.rows[0];

    // Generate JWT token for the new user
    const token = jwt.sign(
      { 
        userId: newUser.user_id,
        email: newUser.email,
        username: newUser.username 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set token as HTTP-only cookie
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

    // Return the newly created user (without the password)
    return res.status(201).json({
      message: 'User created successfully',
      user: newUser
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}