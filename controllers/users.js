const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// register new user
// POST /api/users
// Public
exports.addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: 'User already exist!'
      });
    }

    const newUser = await User.create(req.body);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save();
      })
    })
    
    jwt.sign(
      { id: newUser.id },
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        return res.status(201).json({
          success: true,
          token,
          newUser: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
          },
        });
      }
    )

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Auth user
// POST /api/auth
// Public
exports.authUser = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(400).json({ msg: 'User does not exist!' });
        }

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            jwt.sign(
              { id: user.id },
              config.get('jwtSecret'),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
        
                return res.status(201).json({
                  success: true,
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                  },
                });
              }
            )
          })
      });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// get user data
// GET /api/auth/user
// Private
exports.getUser = (req, res, next) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
}