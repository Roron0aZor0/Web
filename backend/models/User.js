const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema definition
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, // Ensures email is stored in lowercase
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  websitePreferences: {
    color: {
      type: String,
      default: '#ffffff', // Default color
    },
    font: {
      type: String,
      default: 'Arial', // Default font
    },
    content: {
      type: String,
      default: '', // Default content is empty
    },
  },
});

// Hash password before saving it to the database
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // If password isn't modified, skip hashing
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err); // Pass error to next middleware
  }
});

// Method to compare entered password with the stored hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
module.exports = mongoose.model('User', UserSchema);
