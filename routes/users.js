const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  registerUser, 
  loginUser, 
  loadUser 
} = require('../controllers/users');

router
  .route('/register')
  .post(registerUser);

router
  .route('/login')
  .post(loginUser);

router
  .route('/')
  .get(auth, loadUser);

module.exports = router;
