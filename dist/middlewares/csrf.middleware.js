"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csrf = exports.CSRF_TOKEN_HEADER = void 0;

var _csrf = _interopRequireDefault(require("csrf"));

var CSRF_TOKEN_HEADER = "x-csrf-token";
exports.CSRF_TOKEN_HEADER = CSRF_TOKEN_HEADER;
var ignorePaths = ["/api"];
var tokens = new _csrf["default"]();

var csrf = function csrf() {
  return function (req, res, next) {
    next();
  };
};

exports.csrf = csrf;