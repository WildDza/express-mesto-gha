const Codes = require('../utils/codes');

class InternalServerErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Codes.Internal_Server_Error;
  }
}

module.exports = { InternalServerErr };
