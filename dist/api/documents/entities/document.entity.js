"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Document = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Document = /*#__PURE__*/function () {
  function Document(id, userId, title, content, status, participants, createdAt, updatedAt) {
    (0, _classCallCheck2["default"])(this, Document);
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.status = status;
    this.participants = participants;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  (0, _createClass2["default"])(Document, [{
    key: "toJson",
    value: function toJson() {
      return {
        id: this.id,
        userId: this.userId,
        title: this.title,
        content: this.content,
        status: this.status,
        participants: this.participants,
        createdAt: this.createdAt.toISOString(),
        updatedAt: this.updatedAt.toISOString()
      };
    }
  }], [{
    key: "fromJson",
    value: function fromJson(json) {
      if (!json) return null;
      return new Document(json.id, json.user_id, json.title, json.content, json.status, null, new Date(json.created_at), new Date(json.updated_at));
    }
  }]);
  return Document;
}();

exports.Document = Document;