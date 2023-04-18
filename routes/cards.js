const cardsRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { idRegExp, urlRegExp } = require('../utils/validRegularExpressions');
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
      link: Joi.string().required().regex(urlRegExp),
    }),
  }),
  createCard,
);

cardsRoutes.delete(
  '/:cardId',
  celebrate({
    body: Joi.object().keys({
      cardId: Joi.string().length(24).regex(/[a-f0-9]{24,24}/),
    }),
  }),
  deleteCard,
);

cardsRoutes.put(
  '/:cardId/likes',
  celebrate({
    body: Joi.object().keys({
      cardId: Joi.string().length(24).regex(/[a-f0-9]{24,24}/),
    }),
  }),
  likeCard,
);

cardsRoutes.delete(
  '/:cardId/likes',
  celebrate({
    body: Joi.object().keys({
      cardId: Joi.string().length(24).regex(/[a-f0-9]{24,24}/),
    }),
  }),
  dislikeCard,
);

module.exports = cardsRoutes;
