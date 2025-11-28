const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Simple login endpoint for JWT authentication (Bonus feature)
// In production, this should verify against a user database
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple demo authentication (replace with real user verification)
  // For demo purposes, accept any username/password
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required',
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    { username, userId: 1 }, // In production, use actual user ID from database
    process.env.JWT_SECRET || 'default-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        username,
        userId: 1,
      },
    },
  });
});

module.exports = router;

