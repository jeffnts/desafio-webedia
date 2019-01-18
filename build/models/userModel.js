'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Schema = _mongoose2.default.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }

});

// Auth settings with Brcypt
userSchema.pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
        this.encryptPassword(this.password).then(hash => {
            this.password = hash;
            next();
        }).catch(err => next(err));
    } else {
        return next();
    }
});

userSchema.methods = {
    authenticate(plainText) {
        var _this = this;

        return _asyncToGenerator(function* () {
            try {
                return yield _bcryptjs2.default.compare(plainText, _this.password);
            } catch (err) {
                return false;
            }
        })();
    },
    encryptPassword(password) {
        return _bcryptjs2.default.hash(password, 8);
    }
};

exports.default = _mongoose2.default.model('User', userSchema);