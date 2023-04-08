const usersRouter = require("express").Router();
const {
  createUser,
  updateUser,
  updateAvatar,
  getUser,
  getUsers,
} = require("../controllers/users");

usersRouter.get("/", getUsers);
usersRouter.get("/:userId", getUser);
usersRouter.post("/", createUser);
usersRouter.patch("/me", updateUser);
usersRouter.patch("/me/avatar", updateAvatar);

module.exports = usersRouter;
