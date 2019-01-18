'use strict';

var _userModel = require('../../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {

    authenticate: (() => {
        var _ref = _asyncToGenerator(function* (req, res) {
            try {
                const { userName, password } = req.body;

                const user = yield _userModel2.default.findOne({ userName }).select('password');

                if ((yield user) === null) {
                    return res.status(404).json({
                        messaga: 'Usuário ou senha inválidos!'
                    });
                }

                const authenticate = yield user.authenticate(password);
                if (!authenticate) {
                    return res.status(400).json({
                        message: 'Nome de Usuário e Senha são obrigatórios.'
                    });
                }
                const token = `${_jsonwebtoken2.default.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })}`;

                return res.status(200).json({
                    token
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar autenticar o usuário.',
                    error
                });
            }
        });

        return function authenticate(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })(),
    isAuthenticated: (() => {
        var _ref2 = _asyncToGenerator(function* (req, res, next) {
            try {
                const { token } = req.headers;

                if (!token) {
                    return res.status(401).json({
                        message: 'Usuário não autenticado!'
                    });
                }

                const { id } = yield _jsonwebtoken2.default.verify(token.trim(), process.env.SECRET_KEY);
                res.user = {
                    id
                };
                return next();
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar autenticar o usuário.',
                    error
                });
            }
        });

        return function isAuthenticated(_x3, _x4, _x5) {
            return _ref2.apply(this, arguments);
        };
    })()
};