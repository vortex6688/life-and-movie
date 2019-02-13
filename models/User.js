const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide your username'],
    unique: true
  },
  email: { 
    type: String,
    required: [true, 'Please provide your email'],
    unique: [true, 'User with this email is already registered, please provide different email address']
  },
  password: {
    type: String,
    required: [true, 'Please provide your password']
  }
});

UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(error, encrypted) {
    user.password = encrypted
    next()
  })
});

const User = mongoose.model('User', UserSchema);

module.exports = User