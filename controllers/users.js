const bcrypt = require("bcrypt");
const User = require("../models/user");
const Codes = require("../utils/codes");

const createUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const { name, about, avatar, email } = req.body;
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    return res.status(Codes.Created).json({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user.id,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      console.error(err);
      return res.status(Codes.Bad_Request).send({
        message: "Указаны некорректные данные",
      });
    }
    console.error(err);
    return res.status(Codes.Internal_Server_Error).send({
      message: "Ошибка на сервере. Создать пользователя не получилось.",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    );
    return res.json({ name, about });
  } catch (err) {
    if (err.name === "ValidationError") {
      console.error(err);
      return res
        .status(Codes.Bad_Request)
        .send({ message: "Были переданы некорректные данные" });
    }
    console.error(err);
    return res.status(Codes.Internal_Server_Error).send({
      message: "Ошибка на сервере. Данные пользователя изменить не получилось",
    });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
    return res.json({ avatar });
  } catch (err) {
    if (err.name === "ValidationError") {
      console.error(err);
      return res
        .status(Codes.Bad_Request)
        .send({ message: "Были переданы некорректные данные" });
    }
    console.error(err);
    return res.status(Codes.Internal_Server_Error).send({
      message: "Ошибка на сервере. Аватар пользователя изменить не получилось",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(Codes.Not_Found)
        .send({ message: `Пользователь с id: ${userId} не найден` });
    }
    return res.json(user);
  } catch (err) {
    if (err.name === "CastError") {
      console.error(err);
      return res.status(Codes.Bad_Request).send({
        message: "id пользователя некорректный",
      });
    }
    console.error(err);
    return res
      .status(Codes.Internal_Server_Error)
      .send({ message: "Произошла ошибка на сервере" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res
      .status(Codes.Internal_Server_Error)
      .send({ message: "Произошла ошибка на сервере" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+ password");
    if (user === null) {
      throw new Codes.Unauthorized("Wrong email or password");
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new Codes.Unauthorized("Wrong email or password");
    }

    const token = jwt.sign({ _id: user._id }, "user-secret-key", {
      expiresIn: "7d",
    });

    return res
      .cookie("jwt", token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
      .send({ data });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new Codes.Bad_Request("Transferred wrong data"));
    }
    return next(err);
  }
};

module.exports = {
  createUser,
  updateUser,
  updateAvatar,
  getUser,
  getUsers,
  login,
};
