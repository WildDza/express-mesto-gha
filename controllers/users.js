const User = require("../models/user");
const Codes = require("../utils/codes");

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.status(Codes.Created).json(user);
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
        .send({ message: `Пользователь с таким id: ${userId} не найден` });
    }
    return res.json(user);
  } catch (err) {
    if (err.name === "CastError") {
      console.error(err);
      return res
        .status(Codes.Bad_Request)
        .send({ message: "id пользователя некорректный" });
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

module.exports = {
  createUser,
  updateUser,
  updateAvatar,
  getUser,
  getUsers,
};
