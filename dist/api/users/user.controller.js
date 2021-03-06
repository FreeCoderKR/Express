"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _express = require("express");

var _index = require("../../common/exceptions/index.js");

var _requestHandler = require("../../lib/request-handler.js");

var _userRepository = require("./user.repository.js");

var _userService = require("./user.service.js");

var _expressSession = _interopRequireWildcard(require("express-session"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var UserController = /*#__PURE__*/function () {
  function UserController() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, UserController);
    (0, _defineProperty2["default"])(this, "path", "/users");
    (0, _defineProperty2["default"])(this, "router", (0, _express.Router)());
    (0, _defineProperty2["default"])(this, "userService", new _userService.UserService(new _userRepository.UserRepository()));
    (0, _defineProperty2["default"])(this, "signUp", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, email, password, name, _this$userService$cou, hasEmail;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password, name = _req$body.name;

                if (email) {
                  _context.next = 3;
                  break;
                }

                throw new _index.BadRequestException("???????????? ???????????????.");

              case 3:
                if (password) {
                  _context.next = 7;
                  break;
                }

                throw new _index.BadRequestException("??????????????? ???????????????.");

              case 7:
                if (!(password.length < 8)) {
                  _context.next = 9;
                  break;
                }

                throw new _index.BadRequestException("??????????????? ?????? 8?????? ???????????????.");

              case 9:
                if (name) {
                  _context.next = 11;
                  break;
                }

                throw new _index.BadRequestException("????????? ???????????????.");

              case 11:
                _this$userService$cou = _this.userService.countByEmail(email), hasEmail = _this$userService$cou.count;

                if (!hasEmail) {
                  _context.next = 14;
                  break;
                }

                throw new _index.BadRequestException("?????? ????????? ??????????????????.");

              case 14:
                _context.next = 16;
                return _this.userService.signUp({
                  email: email,
                  password: password,
                  name: name
                });

              case 16:
                return _context.abrupt("return", true);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])(this, "login", /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, email, password, _yield$_this$userServ, _yield$_this$userServ2, token, user, store;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

                if (email) {
                  _context2.next = 3;
                  break;
                }

                throw new _index.BadRequestException("???????????? ???????????????.");

              case 3:
                if (password) {
                  _context2.next = 7;
                  break;
                }

                throw new _index.BadRequestException("??????????????? ???????????????.");

              case 7:
                if (!(password.length < 8)) {
                  _context2.next = 9;
                  break;
                }

                throw new _index.BadRequestException("??????????????? ?????? 8?????? ???????????????.");

              case 9:
                if (req.session.viewCount) {
                  req.session.viewCount++;
                } else {
                  req.session.viewCount = 1;
                }

                _context2.next = 12;
                return _this.userService.login({
                  email: email,
                  password: password
                });

              case 12:
                _yield$_this$userServ = _context2.sent;
                _yield$_this$userServ2 = (0, _slicedToArray2["default"])(_yield$_this$userServ, 2);
                token = _yield$_this$userServ2[0];
                user = _yield$_this$userServ2[1];
                // session store
                store = req.sessionStore; // Get all sessions in the store as an array.

                store.all(function (err, sessions) {
                  console.log(sessions); // { sid: { viewCount: 1 } }

                  console.log("count");
                });
                req.session.email = email;
                req.session.status = "user";
                req.session.userId = user.id;
                req.session.token = token;
                return _context2.abrupt("return", {
                  token: token,
                  user: user
                });

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])(this, "me", function (req, res) {
      var email = req.session.email;

      var user = _this.userService.findByEmail(email);

      return {
        user: user.toJson()
      };
    });
    this.initializeRoutes();
  }

  (0, _createClass2["default"])(UserController, [{
    key: "initializeRoutes",
    value: function initializeRoutes() {
      var router = (0, _express.Router)();
      router.post("/signup", (0, _requestHandler.wrap)(this.signUp)).post("/login", (0, _requestHandler.wrap)(this.login)).get("/me", (0, _requestHandler.wrap)(this.me));
      this.router.use(this.path, router);
    }
  }]);
  return UserController;
}();

exports["default"] = UserController;