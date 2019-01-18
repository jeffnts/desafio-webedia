'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authorController = require('../controllers/authorController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.post('/author', _authorController.create).get('/author', _authorController.list).get('/author/:id', _authorController.show).put('/author/:id', _authorController.update).delete('/author/:id', _authorController.remove);

module.exports = app => app.use('/api', router);