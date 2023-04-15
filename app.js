const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const { celebrate, Joi, errors } = require("celebrate");
const { login, createUser } = require("./controllers/users");

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(url),
      about: Joi.string().min(2).max(30),
    }),
  }),
  createUser
);

// app.use((req, res, next) => {
//   req.user = {
//     _id: "643152c448af5508f72f1a3d",
//   };
//   next();
// });
app.use(auth);

app.use(routes);

app.listen(PORT, () => {
  console.log(
    `The application listens on the port from which the server is started: http://localhost:${PORT}`
  );
});
