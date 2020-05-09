const Transaction = require('../models/Transaction');
const { User } = require('../models/User');
const moment = require('moment');

// get all transactions
// GET /api/transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// get certain range of transactions
// GET /api/transactions/:query
exports.getTransaction = async (req, res, next) => {
  try {
    const { query } = req.params;
    const transactions = await Transaction.find({
      user: req.user.id,
      date: {
        $gte: moment().startOf(query),
        $lte: moment().endOf(query),
      }, 
    });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// add transaction
// POST /api/transactions
exports.addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);
    transaction.user = req.user.id;
    transaction.save();

    // const user = await User.findById(req.user.id);
    // user.transactions.push(transaction);
    // user.save();

    return res.status(201).json({
      success: true,
      data: transaction,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }

  }
};

// update transaction
// UPDATE /api/transactions/:id
exports.updateTransaction = async (req, res, next) => {
  try {
    const { amount, text, date } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, text, date },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }
    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
};

// delete transaction
// DELETE /api/transactions/:id
exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }
    await transaction.remove();
    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
};
