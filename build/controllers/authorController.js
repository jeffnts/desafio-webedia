'use strict';

var _authorModel = require('../models/authorModel');

var _authorModel2 = _interopRequireDefault(_authorModel);

var _articleModel = require('../models/articleModel');

var _articleModel2 = _interopRequireDefault(_articleModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
    create: (() => {
        var _ref = _asyncToGenerator(function* (req, res) {
            try {
                yield _authorModel2.default.create(req.body);

                return res.status(201).json({
                    message: 'Autor criado com sucesso!'
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar cadastrar o autor.',
                    error
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

                const authors = yield _authorModel2.default.paginate({}, { offset: parseInt(offset), limit: parseInt(limit) });

                return res.status(200).json({
                    authors
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar listar o autor.',
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
                const { id } = req.params;

                const author = yield _authorModel2.default.findById(id);

                if (author === null) {
                    res.status(404).json({
                        message: 'Este autor não existe.'
                    });
                }

                return res.status(200).json({ author });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar listar os autores.',
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
                const { id } = req.params;

                const author = yield _authorModel2.default.findByIdAndUpdate(id, req.body);

                if (author === null) {
                    res.status(404).json({
                        message: 'Este autor não existe.'
                    });
                }

                return res.status(200).json({
                    message: 'Autor atualizado com sucesso!'
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar atualizar o autor.',
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
                const { id } = req.params;

                const author = yield _authorModel2.default.findById(id);

                if (author === null) {
                    res.status(404).json({
                        message: 'Este autor não existe.'
                    });
                }

                const articles = yield _articleModel2.default.find().where({ authors: id });

                author.remove();

                //Removing the author reference from the article            
                articles.forEach(function (article) {
                    article.authors.remove(author);
                });

                return res.status(200).json({
                    message: 'Autor removido com sucesso!'
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Erro no servidor ao tentar remover o autor.',
                    error: error.message
                });
            }
        });

        return function remove(_x9, _x10) {
            return _ref5.apply(this, arguments);
        };
    })()
};