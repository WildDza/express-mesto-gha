const mongoose = require("mongoose");
const { isEmail, isUrl } = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: "Жак-Ив Кусто",
    },

    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: "Исследователь",
    },

    avatar: {
      type: String,
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator: (url) => isUrl(url),
        message: "Проверьте корректность введенного адреса",
      },
    },
    email: {
      type: String,
      default: "",
      unique: true,
      validate: {
        validator: (email) => isEmail(email),
        message: "Проверьте корректность указанной электронной почты",
      },
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
