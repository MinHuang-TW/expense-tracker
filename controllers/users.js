const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('./validation');


// register new user
// POST /api/user
// Public
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).send('This email has already been used.');
  
    user = await User.create({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = user.generateAuthToken();

    return res
      .status(201)
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// login user
// POST /api/auth
// Public
exports.loginUser = async (req, res, next) => {

  try {
    const { email, password } = req.body;
  
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User does not exist');
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password')

    // const token = jwt.sign({ id: user.id }, config.get('jwtSecret'));
    const token = user.generateAuthToken();
    res.header('x-auth-token', token);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// get user data
// GET /api/user
// Private
exports.loadUser = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  return res.send(user);
};