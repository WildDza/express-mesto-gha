const usersRoutes = require("express").Router();
const {
  updateUser,
  updateAvatar,
  getUser,
  getUsers,
  getMeData,
} = require("../controllers/users");

usersRoutes.get("/", getUsers);
usersRoutes.get("/:userId", getUser);
usersRoutes.patch("/me", updateUser);
usersRoutes.patch("/me/avatar", updateAvatar);
usersRoutes.get("/me", getMeData);

module.exports = usersRoutes;
