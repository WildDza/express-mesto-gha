const { InternalServerErr } = require('../errors/InternalServerErr');

const serverError = (err, req, res, next) => {
  const { statusCode = InternalServerErr, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === InternalServerErr
        ? 'Ошибка на сервере'
        : message,
  });
  next();
};

module.exports = serverError;
