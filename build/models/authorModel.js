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

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    }

});

authorSchema.plugin(_mongoosePaginateV2.default);

exports.default = _mongoose2.default.model('Author', authorSchema);