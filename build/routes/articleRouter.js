'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _articleController = require('../controllers/articleController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.post('/article', _articleController.create).get('/article', _articleController.list).get('/article/:permalink', _articleController.show).put('/article/:permalink', _articleController.update).delete('/article/:permalink', _articleController.remove);

module.exports = app => app.use('/api', router);