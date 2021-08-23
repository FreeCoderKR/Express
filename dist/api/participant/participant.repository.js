"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticipantRepository = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _database = require("../../lib/database.js");

var _participantEntity = require("./entities/participant.entity.js");

var ParticipantRepository = /*#__PURE__*/function () {
  function ParticipantRepository() {
    (0, _classCallCheck2["default"])(this, ParticipantRepository);
    (0, _defineProperty2["default"])(this, "tableName", "participants");
  }

  (0, _createClass2["default"])(ParticipantRepository, [{
    key: "findById",
    value: function findById(id) {
      var raw = _database.db.prepare("SELECT * FROM ".concat(this.tableName, " WHERE id = ?")).get(id);

      return _participantEntity.Participant.fromJson(raw);
    }
  }, {
    key: "findByDocumentIdAndEmail",
    value: function findByDocumentIdAndEmail(documentId, email) {
      var raw = _database.db.prepare("SELECT * FROM ".concat(this.tableName, " WHERE document_id = ? and email = ?")).get(documentId, email);

      return _participantEntity.Participant.fromJson(raw);
    }
  }]);
  return ParticipantRepository;
}();

exports.ParticipantRepository = ParticipantRepository;