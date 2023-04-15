const { Codes } = require("./codes");

class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Codes.Bad_Request;
  }
}

class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Codes.Unauthorized;
  }
}

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Codes.Forbidden;
  }
}

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Codes.Not_Found;
  }
}

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Codes.Conflict;
  }
}

module.exports = {
  BadRequestErr,
  UnauthorizedErr,
  ForbiddenErr,
  NotFoundErr,
  ConflictErr,
};
