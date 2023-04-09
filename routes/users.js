const usersRoutes = require("express").Router();
const {
  createUser,
  updateUser,
  updateAvatar,
  getUser,
  getUsers,
} = require("../controllers/users");

usersRoutes.get("/", getUsers);
usersRoutes.get("/:userId", getUser);
usersRoutes.post("/", createUser);
usersRoutes.patch("/me", updateUser);
usersRoutes.patch("/me/avatar", updateAvatar);

module.exports = usersRoutes;
