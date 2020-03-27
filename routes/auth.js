const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  authUser,
  getUser,
} = require('../controllers/users');

router
  .route('/')
  .post(authUser);

router
  .route('/user')
  .get(auth, getUser);

module.exports = router;