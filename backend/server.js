require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // For handling tokens
const bcrypt = require('bcryptjs'); // For password hashing
const User = require('./models/User'); // Ensure you have a User model in the models directory
const app = express();

// Use environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure you define this in .env

if (!MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in environment variables.');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// Signup endpoint
app.post('/backend/signup', async (req, res) => {
  try {
    const { email, password, websitePreferences } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new user instance
    const newUser = new User({
      email,
      password,
      websitePreferences,
    });

    // Save the user to the database
    await newUser.save();

    // Log a success message after user is saved to the database
    console.log('New user saved to database:', newUser);

    // Respond back to the frontend
    res.status(200).json({ message: 'User signed up successfully', user: newUser });
  } catch (error) {
    console.error('Error handling signup:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});


// Login Endpoint
app.post('/backend/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error handling login:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Protected Route Example (User Dashboard)
app.get('/backend/user/dashboard', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. Token missing.' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ user, message: 'Welcome to your dashboard!' });
  } catch (error) {
    console.error('Error fetching user dashboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Website Builder API!');
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
