'use strict';

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {

    create: (() => {
        var _ref = _asyncToGenerator(function* (req, res) {
            try {
                const { userName } = req.body;

                if (yield _userModel2.default.findOne({ userName })) {
                    return res.status(403).json({
                        message: 'Nome de usuário já está sendo usado!'
                    });
                }

                yield _userModel2.default.create(req.body);

                return res.status(201).json({
                    message: 'Usuário criado com sucesso!'
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar cadastrar o usuário.',
                    error
                });
            }
        });

        return function create(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })(),
    show: (() => {
        var _ref2 = _asyncToGenerator(function* (req, res) {
            try {
                const { token } = req.headers;
                const { id } = yield _jsonwebtoken2.default.verify(token.trim(), process.env.SECRET_KEY);

                const user = yield _userModel2.default.findById(id);

                if (!user) {
                    res.status(404).json({
                        message: 'Usuário não encontrado!'
                    });
                }

                return res.status(200).json({ user });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar encontrar o usuário.',
                    error
                });
            }
        });

        return function show(_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    })(),
    update: (() => {
        var _ref3 = _asyncToGenerator(function* (req, res) {
            try {
                const { token } = req.headers;
                const { id } = yield _jsonwebtoken2.default.verify(token.trim(), process.env.SECRET_KEY);

                const user = yield _userModel2.default.findById(id);

                if (!user) {
                    res.status(404).json({
                        message: 'Usuário não encontrado!'
                    });
                }

                yield user.set(req.body);
                yield user.save();

                return res.status(200).json({
                    message: 'Usuário atualizado com sucesso!'
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar atualizar o usuário.',
                    error
                });
            }
        });

        return function update(_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    })(),
    remove: (() => {
        var _ref4 = _asyncToGenerator(function* (req, res) {
            try {
                const { token } = req.headers;
                const { id } = yield _jsonwebtoken2.default.verify(token.trim(), process.env.SECRET_KEY);

                const user = yield _userModel2.default.findById(id);

                if (!user) {
                    res.status(404).json({
                        message: 'Usuário não encontrado!'
                    });
                }

                yield user.remove();

                return res.status(200).json({
                    message: 'Usuário deletado com sucesso!'
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar deletar o usuário.',
                    error
                });
            }
        });

        return function remove(_x7, _x8) {
            return _ref4.apply(this, arguments);
        };
    })()
};