const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please add your email'],
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);