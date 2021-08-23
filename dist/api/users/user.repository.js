"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepository = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _database = require("../../lib/database.js");

var _userEntity = require("./entities/user.entity.js");

var UserRepository = /*#__PURE__*/function () {
  function UserRepository() {
    (0, _classCallCheck2["default"])(this, UserRepository);
    (0, _defineProperty2["default"])(this, "tableName", "users");
  }

  (0, _createClass2["default"])(UserRepository, [{
    key: "findById",
    value: function findById(id) {
      var raw = _database.db.prepare("SELECT * FROM ".concat(this.tableName, " WHERE id = ?")).get(id);

      return _userEntity.User.fromJson(raw);
    }
  }, {
    key: "findByEmail",
    value: function findByEmail(email) {
      var raw = _database.db.prepare("SELECT * FROM ".concat(this.tableName, " WHERE email = ?")).get(email);

      return _userEntity.User.fromJson(raw);
    }
  }, {
    key: "countByEmail",
    value: function countByEmail(email) {
      return _database.db.prepare("SELECT COUNT(*) as count FROM ".concat(this.tableName, " WHERE email = ?")).get(email);
    }
  }, {
    key: "create",
    value: function create(raw) {
      return _database.db.prepare(["INSERT INTO", this.tableName, "(id, email, name, password, created_at, updated_at)", "VALUES", "($id, $email, $name, $password, $created_at, $updated_at)"].join(" ")).run(raw);
    }
  }]);
  return UserRepository;
}();

exports.UserRepository = UserRepository;