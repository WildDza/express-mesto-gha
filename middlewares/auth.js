const jwt = require('jsonwebtoken');
const { UnauthorizedErr } = require('../errors/UnauthorizedErr');

module.exports = (req, res, next) => {
  let payload;
  try {
    const token = req.cookies.jwt;
    payload = jwt.verify(token, 'user-secret-key');
  } catch (err) {
    next(new UnauthorizedErr('Требуется авторизация'));
    return;
  }
  req.user = payload;
  next();
};
