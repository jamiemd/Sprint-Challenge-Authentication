const {
  authenticate,
  encryptUserPW,
  compareUserPW
} = require('../utils/middlewares');

const { getAllJokes, createUser, login } = require('../controllers');

const server = require('../../server')

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    authenticate('username undefined', res);
    return;
  }
  User.findOne({ username }, (err, user) => {
    if (err || user === null) {
      authenticate('No user found at that id', res);
      return;
    }
    const hashedPw = user.passwordHash;
    bcrypt
      .compare(password, hashedPw)
      .then((response) => {
        if (!response) throw new Error();
        req.session.username = username;
        req.user = user;
      })
      .then(() => {
        res.json({ success: true });
      })
      .catch((error) => {
        return authenticate('some message here', res);
      });
  });
});

server.get('api/jokes', (req, res) => {

});

module.exports = server => {
  server.get('/api/jokes', authenticate, getAllJokes);
  server
    .route('/api/users')
    .post(encryptUserPW /* I need some controller Love*/);
  server.route('/api/login').post(compareUserPW, login);
};
