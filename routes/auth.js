const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { loginUser } = require('../controllers/users');

router
  .route('/')
  .post(loginUser);

module.exports = router;