const usersRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { idRegExp, urlRegExp } = require('../utils/validRegularExpressions');
const {
  updateUser,
  updateAvatar,
  getUser,
  getUsers,
  getMeData,
} = require('../controllers/users');

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getMeData);

usersRoutes.get(
  '/:userId',
  celebrate({
    body: Joi.object().keys({
      id: Joi.string().required().length(24).regex(idRegExp),
    }),
  }),
  getUser,
);

usersRoutes.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

usersRoutes.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(urlRegExp),
    }),
  }),
  updateAvatar,
);

module.exports = usersRoutes;
