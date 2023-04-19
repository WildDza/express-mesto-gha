const router = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const auth = require('../middlewares/auth');
const { NotFoundErr } = require('../errors/NotFoundErr');

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);

router.use('*', (req, res, next) => next(new NotFoundErr('Страница не найдена')));

module.exports = router;
