"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var User = /*#__PURE__*/function () {
  function User(id, email, name, password, createdAt, updatedAt) {
    (0, _classCallCheck2["default"])(this, User);
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  (0, _createClass2["default"])(User, [{
    key: "toJson",
    value: function toJson() {
      return {
        id: this.id,
        name: this.name,
        email: this.email,
        createdAt: this.createdAt.toISOString(),
        updatedAt: this.updatedAt.toISOString()
      };
    }
  }], [{
    key: "fromJson",
    value: function fromJson(json) {
      if (!json) return null;
      return new User(json.id, json.email, json.name, json.password, new Date(json.created_at), new Date(json.updated_at));
    }
  }]);
  return User;
}();

exports.User = User;