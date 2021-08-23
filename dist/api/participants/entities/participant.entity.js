"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Participant = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Participant = /*#__PURE__*/function () {
  function Participant(id, documentId, name, email, status, signature, createdAt, updatedAt) {
    (0, _classCallCheck2["default"])(this, Participant);
    this.id = id;
    this.documentId = documentId;
    this.name = name;
    this.email = email;
    this.status = status;
    this.signature = signature;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  (0, _createClass2["default"])(Participant, [{
    key: "toJson",
    value: function toJson() {
      return {
        id: this.id,
        documentId: this.documentId,
        email: this.email,
        name: this.name,
        status: this.status,
        createdAt: this.createdAt.toISOString(),
        updatedAt: this.updatedAt.toISOString()
      };
    }
  }], [{
    key: "fromJson",
    value: function fromJson(json) {
      if (!json) return null;
      return new Participant(json.id, json.document_id, json.name, json.email, json.status, json.signature, new Date(json.created_at), new Date(json.updated_at));
    }
  }]);
  return Participant;
}();

exports.Participant = Participant;