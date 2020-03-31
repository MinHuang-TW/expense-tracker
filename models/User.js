const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('config');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
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
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  // transactions: [{
  //   type: Schema.Types.ObjectId, 
  //   ref: 'Transaction', 
  // }],
});

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { id: this.id, name: this.name }, 
    config.get('jwtSecret')
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
exports.User = User;