const cardsRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REGEXP_URL } = require('../utils/validRegularExpressions');
const {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  getCards,
} = require('../controllers/cards');

cardsRoutes.get('/', getCards);

cardsRoutes.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(REGEXP_URL),
    }),
  }),
  createCard,
);

cardsRoutes.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard,
);

cardsRoutes.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  likeCard,
);

cardsRoutes.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  dislikeCard,
);

module.exports = cardsRoutes;
