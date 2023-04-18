const Card = require('../models/card');
const Codes = require('../utils/codes');
const { BadRequestErr } = require('../errors/BadRequestErr');
const { ForbiddenErr } = require('../errors/ForbiddenErr');
const { NotFoundErr } = require('../errors/NotFoundErr');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.json(cards);
  } catch (err) {
    return next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });
    return res.status(Codes.Created).json(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestErr('Указаны некорректные данные'));
    }
    return next(err);
  }
};

// const deleteCard = async (req, res, next) => {
//   const { cardId } = req.params;
//   const authUser = req.user._id;
//   try {
//     const card = await Card.findById(cardId);
//     const owner = card.owner.toHexString();
//     if (card) {
//       if (owner === authUser) {
//         await Card.findByIdAndRemove(cardId);
//         return res.send({ message: `Карточка с id: ${cardId} удалена` });
//       }
//       throw new ForbiddenErr('Удаление чужих карточек запрещено');
//     }
//     return next(new NotFoundErr(`Карточка с id: ${cardId} не найдена`));
//   } catch (err) {
//     if (err.name === 'CastError') {
//       return next(new BadRequestErr('id карточки некорректный'));
//     }
//     return next(err);
//   }
// };

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  const authUser = req.user._id;
  try {
    const card = await Card.findById(cardId);
    const owner = card.owner.toHexString();
    if (!card) {
      throw new NotFoundErr(`Карточка с id: ${cardId} не найдена`);
    }
    if (owner !== authUser) {
      throw new ForbiddenErr('Удаление чужих карточек запрещено');
    }
    await Card.findByIdAndRemove(cardId);
    return res.send({ message: `Карточка с id: ${cardId} удалена` });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestErr('id карточки некорректный'));
    }
    return next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundErr(`Карточка с id: ${cardId} не найдена`);
    }
    return res.send({ likes: card.likes, message: 'Лайк установлен' });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestErr('id карточки некорректный'));
    }
    return next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundErr(`Карточка с id: ${cardId} не найдена`);
    }
    return res.send({ likes: card.likes, message: 'Лайк удален' });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestErr('id карточки некорректный'));
    }
    return next(err);
  }
};

module.exports = {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  getCards,
};
