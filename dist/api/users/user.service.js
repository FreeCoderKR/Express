"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _uuid = require("uuid");

var _index = require("../../common/exceptions/index.js");

var _config = require("../../config.js");

var jwt = _interopRequireWildcard(require("../../lib/jwt.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var compare = _bcryptjs["default"].compare,
    hash = _bcryptjs["default"].hash;

var UserService = /*#__PURE__*/function () {
  function UserService(userRepository) {
    (0, _classCallCheck2["default"])(this, UserService);
    this.userRepository = userRepository;
  }

  (0, _createClass2["default"])(UserService, [{
    key: "findById",
    value: function findById(id) {
      return this.userRepository.findById(id);
    }
  }, {
    key: "findByEmail",
    value: function findByEmail(email) {
      return this.userRepository.findByEmail(email);
    }
  }, {
    key: "countByEmail",
    value: function countByEmail(email) {
      return this.userRepository.countByEmail(email);
    }
  }, {
    key: "signUp",
    value: function () {
      var _signUp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var name, email, password, _this$countByEmail, hasEmail, encreyptedPassword, id, now;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _ref.name, email = _ref.email, password = _ref.password;
                _this$countByEmail = this.countByEmail(email), hasEmail = _this$countByEmail.count;

                if (!hasEmail) {
                  _context.next = 4;
                  break;
                }

                throw new _index.BadRequestException("중복된 이메일이 있습니다.");

              case 4:
                _context.next = 6;
                return hash(password, _config.hashRounds);

              case 6:
                encreyptedPassword = _context.sent;
                id = (0, _uuid.v4)();
                now = new Date().toISOString();
                this.userRepository.create({
                  id: id,
                  email: email,
                  name: name,
                  password: encreyptedPassword,
                  created_at: now,
                  updated_at: now
                });
                return _context.abrupt("return", id);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function signUp(_x) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
        var email, password, user, isValidPassword, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                email = _ref2.email, password = _ref2.password;
                user = this.findByEmail(email);

                if (user) {
                  _context2.next = 4;
                  break;
                }

                throw new _index.BadRequestException("이메일 또는 비밀번호를 다시 확인해 주세요.");

              case 4:
                _context2.next = 6;
                return compare(password, user.password);

              case 6:
                isValidPassword = _context2.sent;

                if (isValidPassword) {
                  _context2.next = 9;
                  break;
                }

                throw new _index.BadRequestException("이메일 또는 비밀번호를 다시 확인해 주세요.");

              case 9:
                token = jwt.sign({
                  user_id: user.id,
                  email: email
                });
                return _context2.abrupt("return", [token, user.toJson()]);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function login(_x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }]);
  return UserService;
}();

exports.UserService = UserService;