'use strict';

var _articleModel = require('../models/articleModel');

var _articleModel2 = _interopRequireDefault(_articleModel);

var _authorModel = require('../models/authorModel');

var _authorModel2 = _interopRequireDefault(_authorModel);

var _commentsModel = require('../models/commentsModel');

var _commentsModel2 = _interopRequireDefault(_commentsModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
    create: (() => {
        var _ref = _asyncToGenerator(function* (req, res) {
            try {
                const { authors } = req.body;

                if (yield !authors) {
                    return res.status(406).json({
                        message: 'É obrigatório um artigo ter autor!'
                    });
                }

                const author = yield _authorModel2.default.findById(authors);

                if (author === null) {
                    return res.status(404).json({
                        message: 'Este autor não existe.'
                    });
                }

                yield _articleModel2.default.create(req.body);
                return res.status(201).json({
                    message: 'Artigo criado com sucesso!'
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar cadastrar o artigo.',
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
                const { offset, limit } = req.query;

                const articles = yield _articleModel2.default.paginate({}, { offset: parseInt(offset), limit: parseInt(limit), populate: ['authors', 'comments'] });

                //Omitting the User Id 
                articles.docs.forEach(function (elements) {
                    for (let i = 0; i < elements.comments.length; i++) {
                        elements.comments[i].user = undefined;
                    }
                });

                return res.status(200).json({ articles });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar listar os artigos.',
                    error: error.message
                });
            }
        });

        return function list(_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    })(),
    show: (() => {
        var _ref3 = _asyncToGenerator(function* (req, res) {
            try {
                const { permalink } = req.params;

                const article = yield _articleModel2.default.findOne({ permalink }).populate('authors').populate('comments');

                if (article === null) {
                    res.status(404).json({
                        message: 'Este artigo não existe.'
                    });
                }

                //Omitting the User Id 
                for (let i = 0; i < article.comments.length; i++) {
                    article.comments[i].user = undefined;
                }

                return res.status(200).json({ article });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar listar o artigo.',
                    error: error.message
                });
            }
        });

        return function show(_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    })(),
    update: (() => {
        var _ref4 = _asyncToGenerator(function* (req, res) {
            try {
                const { permalink } = req.params;

                const article = yield _articleModel2.default.findOne({ permalink }).populate('authors').populate('comments');

                if (article === null) {
                    res.status(404).json({
                        message: 'Este artigo não existe.'
                    });
                }

                yield article.set(req.body);
                yield article.set({ updateDate: Date.now() });
                yield article.save();

                return res.status(200).json({
                    message: 'Artigo atualizado com sucesso!'
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar atualizar o artigo.',
                    error: error.message
                });
            }
        });

        return function update(_x7, _x8) {
            return _ref4.apply(this, arguments);
        };
    })(),
    remove: (() => {
        var _ref5 = _asyncToGenerator(function* (req, res) {
            try {
                const { permalink } = req.params;

                const article = yield _articleModel2.default.findOne({ permalink }).populate('authors').populate('comments');

                if (article === null) {
                    res.status(404).json({
                        message: 'Este artigo não existe.'
                    });
                }
                const comments = yield _commentsModel2.default.find().where({ article: article._id });

                article.remove();

                //Removing all comments
                comments.forEach(function (comment) {
                    comment.remove();
                });

                return res.status(200).json({
                    message: 'Artigo deletado com sucesso!'
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar deletar o artigo.',
                    error: error.message
                });
            }
        });

        return function remove(_x9, _x10) {
            return _ref5.apply(this, arguments);
        };
    })()
};