const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
  },
  text: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number']
  },
  date: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);