"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = require("bcryptjs");

var _faker = require("faker");

var _userRepository = require("./user.repository.js");

var _userService = require("./user.service.js");

describe("UserService", function () {
  var userService;
  var userRepository;
  beforeEach( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userRepository = new _userRepository.UserRepository();
            userService = new _userService.UserService(userRepository);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("should be defined", function () {
    expect(userService).toBeDefined();
  });
  describe("signUp", function () {
    it("성공 - 비밀번호를 암호화하고 사용자를 생성한다.", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var countByEmailStub, createStub, dto, result, user, isValidPassword;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // given
              countByEmailStub = jest.spyOn(userRepository, "countByEmail").mockImplementation(function () {
                return {
                  count: 0
                };
              });
              createStub = jest.spyOn(userRepository, "create").mockImplementation(function (user) {
                return {
                  lastInsertRowid: user.id,
                  changes: 1
                };
              });
              dto = {
                email: _faker.internet.email(),
                name: _faker.internet.userName(),
                password: _faker.internet.password()
              }; // when

              _context2.next = 5;
              return userService.signUp(dto);

            case 5:
              result = _context2.sent;
              // then
              expect(result).not.toBeFalsy();
              expect(countByEmailStub).toHaveBeenCalled();
              expect(createStub).toHaveBeenCalled();
              user = createStub.mock.calls[0][0];
              expect(user.id).toEqual(result);
              expect(user.email).toEqual(dto.email);
              expect(user.name).toEqual(dto.name);
              _context2.next = 15;
              return (0, _bcryptjs.compare)(dto.password, user.password);

            case 15:
              isValidPassword = _context2.sent;
              expect(isValidPassword).toBe(true);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("실패 - 이미 사용중인 이메일은 가입 할 수 없다.", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var countByEmailStub, createStub, dto, result;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // given
              countByEmailStub = jest.spyOn(userRepository, "countByEmail").mockImplementation(function () {
                return {
                  count: 1
                };
              });
              createStub = jest.spyOn(userRepository, "create").mockImplementation(function (user) {
                return {
                  lastInsertRowid: user.id,
                  changes: 1
                };
              });
              dto = {
                email: _faker.internet.email(),
                name: _faker.internet.userName(),
                password: _faker.internet.password()
              }; // when

              result = expect(function () {
                return userService.signUp(dto);
              }); // then

              _context3.next = 6;
              return result.rejects.toThrow("중복된 이메일이 있습니다.");

            case 6:
              expect(countByEmailStub).toHaveBeenCalled();
              expect(createStub).not.toHaveBeenCalled();

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
});