'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginateV = require('mongoose-paginate-v2');

var _mongoosePaginateV2 = _interopRequireDefault(_mongoosePaginateV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String
    },
    permalink: {
        type: String,
        required: true,
        unique: true
    },
    publicationDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    },
    authors: [{
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }]

});

articleSchema.plugin(_mongoosePaginateV2.default);

exports.default = _mongoose2.default.model('Article', articleSchema);