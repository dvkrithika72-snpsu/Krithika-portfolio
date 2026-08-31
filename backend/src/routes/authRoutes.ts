import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }

  try {
    // Check for user
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';
    
    // Create token payload
    const payload = {
      id: user._id,
      username: user.username
    };

    // Sign token
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/setup
// @desc    Create the initial admin user (only works if no users exist)
router.post('/setup', async (req, res): Promise<void> => {
  try {
    // Check if any users already exist
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      res.status(403).json({ error: 'Setup already completed. Users exist.' });
      return;
    }

    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({ 
      success: true, 
      message: 'Admin user created successfully.',
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
