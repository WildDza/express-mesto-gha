const { Codes } = require("../utils/codes");

const serverError = (res, err, next) => {
  const { statusCode = Codes.Internal_Server_Error, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === Codes.Internal_Server_Error
        ? "Ошибка на сервере"
        : message,
  });
  next();
};

module.exports = serverError;
