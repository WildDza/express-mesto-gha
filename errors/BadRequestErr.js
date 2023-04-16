const Codes = require('../utils/codes');

class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Codes.Bad_Request;
  }
}

module.exports = { BadRequestErr };
