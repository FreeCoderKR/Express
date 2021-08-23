"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeDatabase = initializeDatabase;
exports.closeDatabase = closeDatabase;
exports.transaction = transaction;
exports.db = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _betterSqlite = _interopRequireDefault(require("better-sqlite3"));

var _fs = _interopRequireDefault(require("fs"));

var db;
exports.db = db;

function initializeDatabase(_x, _x2) {
  return _initializeDatabase.apply(this, arguments);
}

function _initializeDatabase() {
  _initializeDatabase = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(filename, options) {
    var schema;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            exports.db = db = new _betterSqlite["default"](filename, options);
            schema = _fs["default"].readFileSync("schema.sql").toString("utf-8");
            db.exec(schema);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _initializeDatabase.apply(this, arguments);
}

function closeDatabase() {
  return _closeDatabase.apply(this, arguments);
}

function _closeDatabase() {
  _closeDatabase = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (db) {
              db.close();
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _closeDatabase.apply(this, arguments);
}

function transaction(cb) {
  var result;
  db.transaction(function () {
    result = cb();
  })();
  return result;
}