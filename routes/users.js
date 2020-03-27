const express = require('express');
const router = express.Router();
const {
  addUser,
  deleteTransactions
} = require('../controllers/users');

router
  .route('/')
  .post(addUser);

// router
//   .route('/:id')
//   .delete(deleteTransactions);

module.exports = router;
