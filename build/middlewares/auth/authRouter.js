'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authController = require('./authController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.post('/auth/login', _authController.authenticate);

module.exports = app => app.use('/api', router);