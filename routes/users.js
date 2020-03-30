const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  registerUser, 
  loginUser, 
  loadUser 
} = require('../controllers/users');

router
  .route('/')
  .post(registerUser);

router
  .route('/')
  .get(auth, loadUser);

module.exports = router;
