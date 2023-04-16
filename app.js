const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const routes = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const serverError = require('./middlewares/serverError');
const { urlRegExp } = require('./utils/validRegularExpressions');
// const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use(cookieParser());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(urlRegExp),
      about: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);

app.use(routes);

app.use(errors());

app.use(serverError);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, (err) => (
  err
    ? console.error(err)
    : console.log(`The application listens on the port from which the server is started: http://localhost:${PORT}`)
));
