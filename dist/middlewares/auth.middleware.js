"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyJWT = void 0;

var _index = require("../common/exceptions/index.js");

var _jwt = require("../lib/jwt.js");

var verifyJWT = function verifyJWT(req, res, next) {
  var bearerToken = req.headers["authorization"];

  if (bearerToken) {
    try {
      var token = bearerToken.replace(/^Bearer /, "");
      var decoded = (0, _jwt.verify)(token);
      next();
    } catch (err) {
      next(new _index.UnauthorizedException());
    }
  } else {
    next();
  }
};

exports.verifyJWT = verifyJWT;