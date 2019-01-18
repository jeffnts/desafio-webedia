'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _server = require('./config/server');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

(0, _server.redisConnection)();

(0, _server.databaseConnection)();

if (!module.parent) (0, _server.initServer)(app, 4000);

//Body Parser config
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

require('./routes')(app);
require('./middlewares/auth/authRouter')(app);

(0, _server.initSwagger)(app);

exports.default = app;