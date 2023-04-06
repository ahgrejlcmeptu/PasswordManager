module.exports = {
  user: require('./user.controller'),
  token: require('../services/token.service'),
  password: require('./password.controller'),
  registration: require('./registration.controller'),
};
