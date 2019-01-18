'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _commentsController = require('../controllers/commentsController');

var _authController = require('../middlewares/auth/authController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.post('/comments/:permalink', _authController.isAuthenticated, _commentsController.create).get('/comments/:permalink', _authController.isAuthenticated, _commentsController.list).put('/comments/:commentId/:permalink', _authController.isAuthenticated, _commentsController.update).delete('/comments/:commentId/:permalink', _authController.isAuthenticated, _commentsController.remove);

module.exports = app => app.use('/api', router);