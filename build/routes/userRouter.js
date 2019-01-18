'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController');

var _authController = require('../middlewares/auth/authController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

/**
 * @swagger
 * /user:
 *    get:
 *      description: This should return all users
 */
router.post('/user', _userController.create).get('/user', _authController.isAuthenticated, _userController.show).put('/user', _authController.isAuthenticated, _userController.update).delete('/user', _authController.isAuthenticated, _userController.remove);

module.exports = app => app.use('/api', router);