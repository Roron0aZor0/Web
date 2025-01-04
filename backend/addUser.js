require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB!');

    // Define User schema (same as your User model)
    const User = mongoose.model('User', new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    }));

    // Hash the password
    const password = 'newpassword123'; // The password you want to hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
      email: 'newuser12@example.com', // The email you want to assign to the new user
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
    console.log('User created successfully!');
    
    // Close the database connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    mongoose.connection.close();
  });
