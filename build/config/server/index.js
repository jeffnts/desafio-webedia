'use strict';

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();


function initServer(app, port) {
    const PORT = process.env.PORT || port;
    const HOST = process.env.HOST || '0.0.0.0';

    app.listen(port, HOST, () => {
        console.log(`App linten on port ${PORT}`);
    });
}

function databaseConnection() {
    if (process.env.NODE_ENV === 'test') {
        const database = require('../database/test');
        database.connect();
    } else if (process.env.NODE_ENV === 'development') {
        const database = require('../database/development');
        database.connect();
    } else if (process.env.NODE_ENV === 'production') {
        const database = require('../database/production');
        database.connect();
    }
}

function initSwagger(app) {
    const swaggerFile = require('../../docs/swagger.json');
    swaggerFile.host = process.env.URL_SWAGGER;
    app.use('/', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(swaggerFile));
}

module.exports = {
    initServer,
    databaseConnection,
    initSwagger

};