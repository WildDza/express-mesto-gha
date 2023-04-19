const usersRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils/validRegularExpressions');
const {
  updateUser,
  updateAvatar,
  getUser,
  getUsers,
  getMeData,
} = require('../controllers/users');

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getMeData);

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

usersRoutes.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }),
  getUser,
);

module.exports = usersRoutes;
