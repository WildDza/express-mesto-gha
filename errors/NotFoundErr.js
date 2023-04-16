const Codes = require('../utils/codes');

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Codes.Not_Found;
  }
}

module.exports = { NotFoundErr };
