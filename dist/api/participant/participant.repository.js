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
  }, {
    key: "findAllByDocumentId",
    value: function findAllByDocumentId(documentId) {
      var rows = _database.db.prepare("SELECT * FROM ".concat(this.tableName, " WHERE document_id = ? ")).all(documentId);

      rows = rows.map(function (row) {
        return _participantEntity.Participant.fromJson(row);
      });
      return rows;
    }
  }, {
    key: "create",
    value: function create(raw) {
      return _database.db.prepare(["INSERT INTO", this.tableName, "(id, document_id, name, email, status, created_at, updated_at)", "VALUES", "($id, $documentId, $name, $email, $status, $created_at, $updated_at)"].join(" ")).run(raw);
    }
  }, {
    key: "updateInvited",
    value: function updateInvited(documentId) {
      return _database.db.prepare("UPDATE ".concat(this.tableName, " SET STATUS=INVITED WHERE document_id=?")).run(documentId);
    }
  }]);
  return ParticipantRepository;
}();

exports.ParticipantRepository = ParticipantRepository;