// const express = require('express');
const router = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
// const Codes = require('../utils/codes');
const auth = require('../middlewares/auth');
const { NotFoundErr } = require('../errors/NotFoundErr');

// const app = express();
// app.use(auth);

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);

router.use('*', (req, res, next) => next(new NotFoundErr('Страница не найдена')));
// res.status(Codes.Not_Found).send({ message: 'Страница не найдена' });

module.exports = router;
