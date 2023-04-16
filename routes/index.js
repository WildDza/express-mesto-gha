const router = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const Codes = require('../utils/codes');

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);

router.use((req, res) => {
  res.status(Codes.Not_Found).send({ message: 'Страница не найдена' });
});

module.exports = router;
