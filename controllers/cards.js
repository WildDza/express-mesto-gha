const Card = require("../models/card");
const Codes = require("../utils/codes");

const createCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });
    return res.status(Codes.Created).json(card);
  } catch (err) {
    if (err.name === "ValidationError") {
      console.error(err);
      return res
        .status(Codes.Bad_Request)
        .send({ message: "Указаны некорректные данные" });
    }
    console.error(err);
    return res
      .status(Codes.Internal_Server_Error)
      .send({ message: "Ошибка на сервере. Добавить карточку не получилось." });
  }
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndRemove(cardId);
    if (card) {
      return res
        .status(Codes.OK)
        .send({ message: `Карточка с id: ${cardId} удалена` });
    } else {
      return res
        .status(Codes.Not_Found)
        .send({ message: `Карточка с id: ${cardId} не найдена` });
    }
  } catch (err) {
    if (err.name === "CastError") {
      console.error(err);
      return res
        .status(Codes.Bad_Request)
        .send({ message: "id карточки некорректный" });
    }
    console.error(err);
    return res
      .status(Codes.Internal_Server_Error)
      .send({ message: "Произошла ошибка на сервере" });
  }
};

const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    if (!card) {
      return res
        .status(Codes.Not_Found)
        .send({ message: `Карточка с id: ${cardId} не найдена` });
    }
    return res.send({ likes: card.likes, message: "Лайк установлен" });
  } catch (err) {
    if (err.name === "CastError") {
      console.error(err);
      return res
        .status(Codes.Bad_Request)
        .send({ message: "id карточки некорректный" });
    }
    console.error(err);
    return res
      .status(Codes.Internal_Server_Error)
      .send({ message: "Произошла ошибка на сервере" });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    if (!card) {
      return res
        .status(Codes.Not_Found)
        .send({ message: `Карточка с id: ${cardId} не найдена` });
    }
    return res.send({ likes: card.likes, message: "Лайк удален" });
  } catch (err) {
    if (err.name === "CastError") {
      console.error(err);
      return res
        .status(Codes.Bad_Request)
        .send({ message: "id карточки некорректный" });
    }
    console.error(err);
    return res
      .status(Codes.Internal_Server_Error)
      .send({ message: "Произошла ошибка на сервере" });
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.json(cards);
  } catch (err) {
    console.error(err);
    return res
      .status(Codes.Internal_Server_Error)
      .send({ message: "Произошла ошибка на сервере" });
  }
};

module.exports = {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  getCards,
};
