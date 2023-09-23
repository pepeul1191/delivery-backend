const UserController = require('../controllers/user_controller');

module.exports = (app) => {
  app.post('/api/user/create', UserController.register);
  app.post('/api/user/login', UserController.login);
};