const Codes = require('../utils/codes');

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Codes.Conflict;
  }
}

module.exports = { ConflictErr };
