const mongoose = require('mongoose');
const isUrl = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
    },

    link: {
      type: String,
      required: true,
      validate: {
        validator: (url) => isUrl(url),
        message: 'Проверьте корректность введенного адреса',
      },
    },

    owner: {
      ref: 'user',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    likes: {
      ref: 'user',
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
