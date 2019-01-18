'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _authorModel = require('../models/authorModel');

var _authorModel2 = _interopRequireDefault(_authorModel);

var _sanitizeTestObject = require('../config/tests/sanitizeTestObject');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const request = require('supertest')(_app2.default.callback());

const connection = require('../config/database/test');


const dropCollection = (() => {
    var _ref = _asyncToGenerator(function* () {
        return _authorModel2.default.remove();
    });

    return function dropCollection() {
        return _ref.apply(this, arguments);
    };
})();

beforeAll(() => {
    dropCollection();
});

afterAll(() => {
    connection.disconect();
});

describe('Author tests', () => {});