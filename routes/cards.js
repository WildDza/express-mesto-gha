const cardsRoutes = require("express").Router();
const {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  getCards,
} = require("../controllers/cards");

cardsRoutes.post("/", createCard);
cardsRoutes.delete("/:cardId", deleteCard);
cardsRoutes.put("/:cardId/likes", likeCard);
cardsRoutes.delete("/:cardId/likes", dislikeCard);
cardsRoutes.get("/", getCards);

module.exports = cardsRoutes;
