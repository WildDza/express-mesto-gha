const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Жак-Ив Кусто',
    },

    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Исследователь',
    },

    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      valid: {
        validator: validator.isUrl,
        message: 'Проверьте указанный адрес картинки',
      },
    },
    email: {
      type: String,
      unique: true,
      require: true,
      valid: {
        validator: validator.isEmail,
        message: 'Проверьте указанную почту',
      },
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
