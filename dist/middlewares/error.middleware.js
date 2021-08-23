"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMiddleware = void 0;

var errorMiddleware = function errorMiddleware(err, req, res, next) {
  var status = err.status || 500;
  var message = err.message;
  res.status(status).send({
    status: status,
    message: message
  });
  next();
};

exports.errorMiddleware = errorMiddleware;