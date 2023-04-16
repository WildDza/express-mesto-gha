const Codes = require('../utils/codes');

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Codes.Forbidden;
  }
}

module.exports = { ForbiddenErr };
