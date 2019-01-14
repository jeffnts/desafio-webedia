import mongoose from 'mongoose'
const Schema = mongoose.Schema
import bcrypt from 'bcryptjs'

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
    password:{
        type: String,
        required: true,
        select: false
    }

});

// Auth settings with Brcypt
userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
      this.encryptPassword(this.password)
          .then(hash => {
              this.password = hash;
              next();
          })
          .catch(err => next(err));
  } else {
      return next();
  }
});

userSchema.methods = {
  async authenticate(plainText) {
      try {
          return await bcrypt.compare(plainText, this.password);
      } catch (err) {
          return false;
      }
  },
  encryptPassword(password) {
      return bcrypt.hash(password, 8);
  },
};


export default  mongoose.model('User', userSchema)