const Codes = require('../utils/codes');

class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Codes.Unauthorized;
  }
}

module.exports = { UnauthorizedErr };
