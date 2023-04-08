const cardsRouter = require("express").Router();
const {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  getCards,
} = require("../controllers/cards");

router.post("/", createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);
router.get("/", getCards);

module.exports = cardsRouter;
