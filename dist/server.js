"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _documentController = _interopRequireDefault(require("./api/documents/document.controller.js"));

var _participantController = _interopRequireDefault(require("./api/participant/participant.controller.js"));

var _userController = _interopRequireDefault(require("./api/users/user.controller.js"));

var _app = _interopRequireDefault(require("./app.js"));

var _database = require("./lib/database.js");

function startServer() {
  return _startServer.apply(this, arguments);
}

function _startServer() {
  _startServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var app;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _database.initializeDatabase)(":memory:");

          case 2:
            app = new _app["default"]([new _userController["default"](), new _participantController["default"](), new _documentController["default"]()]);
            app.listen();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _startServer.apply(this, arguments);
}

startServer();