'use strict';

var _commentsModel = require('../models/commentsModel');

var _commentsModel2 = _interopRequireDefault(_commentsModel);

var _articleModel = require('../models/articleModel');

var _articleModel2 = _interopRequireDefault(_articleModel);

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
                const { token } = req.headers;
                const { id } = yield _jsonwebtoken2.default.verify(token.trim(), process.env.SECRET_KEY);

                const user = yield _userModel2.default.findById(id);

                const { permalink } = req.params;
                const article = yield _articleModel2.default.findOne({ permalink });

                if (article === null) {
                    res.status(404).json({
                        message: 'Artigo não encontrado'
                    });
                }

                const comment = yield _commentsModel2.default.create({
                    content: req.body.content,
                    user,
                    article
                });

                article.comments.push(comment);
                article.save();

                return res.status(201).json({
                    message: 'Comentário cadastrado com sucesso!'
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar cadastrar o comentário.',
                    error: error.message
                });
            }
        });

        return function create(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })(),
    list: (() => {
        var _ref2 = _asyncToGenerator(function* (req, res) {
            try {
                const { token } = req.headers;
                const { id } = yield _jsonwebtoken2.default.verify(token.trim(), process.env.SECRET_KEY);

                const { permalink } = req.params;
                const { offset, limit } = req.query;

                const user = yield _userModel2.default.findById(id);
                const article = yield _articleModel2.default.findOne({ permalink });

                const comments = yield _commentsModel2.default.paginate({ user, article }, { offset: parseInt(offset), limit: parseInt(limit) });

                return res.status(200).json({ comments });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar listar os comentários.',
                    error: error.message
                });
            }
        });

        return function list(_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    })(),
    update: (() => {
        var _ref3 = _asyncToGenerator(function* (req, res) {
            try {
                const { token } = req.headers;
                const { id } = yield _jsonwebtoken2.default.verify(token.trim(), process.env.SECRET_KEY);

                const { permalink, commentId } = req.params;

                const user = yield _userModel2.default.findById(id);
                const article = yield _articleModel2.default.findOne({ permalink });

                const comment = yield _commentsModel2.default.findById(commentId).where({ user, article });

                if (comment === null || article === null) {
                    return res.status(404).json({
                        message: 'Comentário ou artigo não encontrado.'
                    });
                }

                if (!(comment.user == id)) {
                    return res.status(401).json({
                        message: 'Usuário Não autorizado.'
                    });
                }

                yield comment.set(req.body);
                yield comment.save();

                return res.status(200).json({
                    message: 'Comentário atualizado com sucesso!'
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar atualizar o comentários.',
                    error: error.message
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

                const { permalink, commentId } = req.params;

                const user = yield _userModel2.default.findById(id);
                const article = yield _articleModel2.default.findOne({ permalink });

                const comment = yield _commentsModel2.default.findById(commentId).where({ user, article });

                if (comment === null || article === null) {
                    return res.status(404).json({
                        message: 'Comentário ou artigo não encontrado.'
                    });
                }

                if (!(comment.user == id)) {
                    return res.status(401).json({
                        message: 'Usuário Não autorizado'
                    });
                }

                yield comment.remove();
                article.comments.remove(comment);
                article.save();

                return res.status(200).json({
                    message: 'Comentário removido com sucesso!'

                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar deletar o comentário.',
                    error: error.message
                });
            }
        });

        return function remove(_x7, _x8) {
            return _ref4.apply(this, arguments);
        };
    })()
};