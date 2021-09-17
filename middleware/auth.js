const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function auth(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(503).send('Please authenticate.');
  }
}

module.exports = auth;
