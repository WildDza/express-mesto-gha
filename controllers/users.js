const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Codes = require('../utils/codes');
const { BadRequestErr } = require('../errors/BadRequestErr');
const { UnauthorizedErr } = require('../errors/UnauthorizedErr');
const { ConflictErr } = require('../errors/ConflictErr');
const { NotFoundErr } = require('../errors/NotFoundErr');

const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    };
    const result = await User.create(user);
    result.password = undefined;
    return res.status(Codes.Created).json(
      result,
    );
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictErr('Пользователь с такой электронной почтой уже зарегистрирован'));
    }
    if (err.name === 'ValidationError') {
      return next(new BadRequestErr('Указаны некорректные данные'));
    }
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    return res.json({ name, about });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestErr('Были переданы некорректные данные'));
    }
    return next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    return res.json({ avatar });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestErr('Были переданы некорректные данные'));
    }
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundErr(`Пользователь с id: ${userId} не найден`);
    }
    return res.json(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestErr('id пользователя некорректный'));
    }
    return next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedErr('Ошибка в почте или пароле');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedErr('Ошибка в почте или пароле');
    }

    const token = jwt.sign({ _id: user._id }, 'user-secret-key', {
      expiresIn: '7d',
    });
    return res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send({ message: 'Данные хранятся в httpOnly куках' });
  } catch (err) {
    return next(err);
  }
};

const getMeData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NotFoundErr(`Пользователь с id: ${req.user._id} не найден`));
    }
    return res.status(200).send(user);
  } catch (err) {
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
  getMeData,
};
