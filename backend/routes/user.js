// routes/user.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Assuming you have a middleware to verify JWT token

// Update user's website customization preferences
router.post('/customize-website', authMiddleware, async (req, res) => {
  try {
    const { color, font, content } = req.body;
    
    // Find the logged-in user (using the user ID from the JWT token)
    const user = await User.findById(req.user.id);

    // If no user found, return an error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's website preferences
    user.websitePreferences.color = color || user.websitePreferences.color;
    user.websitePreferences.font = font || user.websitePreferences.font;
    user.websitePreferences.content = content || user.websitePreferences.content;

    await user.save();

    // Return success response
    res.json({ message: 'Website customized successfully', preferences: user.websitePreferences });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving customization' });
  }
});

module.exports = router;
