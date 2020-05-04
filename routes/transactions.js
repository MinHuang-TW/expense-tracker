const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getTransactions,
  getTransaction,
  addTransactions,
  deleteTransactions
} = require('../controllers/transactions');

router
  .route('/:query')
  .get(auth, getTransaction);

router
  .route('/')
  .get(auth, getTransactions)
  .post(auth, addTransactions);
  
router
  .route('/:id')
  .delete(auth, deleteTransactions);


module.exports = router;
