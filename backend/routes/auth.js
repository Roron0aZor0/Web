const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path if necessary
const router = express.Router();
const bcrypt = require('bcryptjs');


console.log(User); // Add this line to see if the model is correctly imported

  router.post('/login', async (req, res) => {
    console.log('Login attempt:', req.body); // Log the request body to verify the input
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      
      if (!user) {
        console.log('User not found with email:', email); // Log user not found
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
  
      // Check if the entered password matches the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Password mismatch for user:', email); // Log password mismatch
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send response with token
      res.json({ success: true, message: 'Login successful!', token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  
module.exports = router;
