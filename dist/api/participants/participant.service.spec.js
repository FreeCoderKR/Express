"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _participantService = require("./participant.service.js");

describe("ParticipantService", function () {
  var service;
  beforeEach( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            service = new _participantService.ParticipantService(null);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("should be defined", function () {
    expect(service).toBeDefined();
  });
});