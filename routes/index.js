const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const { REGEXP_URL } = require('../utils/validRegularExpressions');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const auth = require('../middlewares/auth');
const { NotFoundErr } = require('../errors/NotFoundErr');

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(REGEXP_URL),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.use('*', (req, res, next) => next(new NotFoundErr('Страница не найдена')));

module.exports = router;
