const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  // there should be a user object set on req
  // use that req.user object to create a user and save it to our Mongo instance.
  const { username } = req.body
  const password = req.password
  if (!req.username) {
    return res.status(403).json({
      error: 'no username check your comparePW middleware'
    });
  }
};

module.exports = {
  createUser
};
