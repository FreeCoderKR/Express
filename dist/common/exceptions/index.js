"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpException = require("./http.exception.js");

Object.keys(_httpException).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _httpException[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _httpException[key];
    }
  });
});

var _badRequestException = require("./bad-request.exception.js");

Object.keys(_badRequestException).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _badRequestException[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _badRequestException[key];
    }
  });
});

var _forbiddenException = require("./forbidden.exception.js");

Object.keys(_forbiddenException).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _forbiddenException[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _forbiddenException[key];
    }
  });
});

var _notFoundException = require("./not-found.exception.js");

Object.keys(_notFoundException).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _notFoundException[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _notFoundException[key];
    }
  });
});

var _unauthorizedException = require("./unauthorized.exception.js");

Object.keys(_unauthorizedException).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _unauthorizedException[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _unauthorizedException[key];
    }
  });
});