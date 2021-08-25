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
    (0, _defineProperty2["default"])(this, "historyTableName", "participant_histories");
    (0, _defineProperty2["default"])(this, "historyinsertsql", ["INSERT INTO", this.historyTableName, "(participant_id, type, data, created_at)", "VALUES", "($participant_id, $type, $data, $created_at)"].join(" "));
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
      console.log(documentId);
      console.log(email);

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
      var now = new Date().toISOString();

      var create_result = _database.db.prepare(["INSERT INTO", this.tableName, "(id, document_id, name, email, status, created_at, updated_at)", "VALUES", "($id, $documentId, $name, $email, $status, $created_at, $updated_at)"].join(" ")).run(raw);

      var history = {
        participant_id: raw.id,
        type: "CREATE",
        data: JSON.stringify(raw),
        created_at: now
      };

      _database.db.prepare(this.historyinsertsql).run(history);

      return create_result;
    }
  }, {
    key: "delete",
    value: function _delete(documentId) {
      var _this = this;

      var now = new Date().toISOString();

      var delete_result = _database.db.prepare("UPDATE ".concat(this.tableName, " SET STATUS=?, updated_at=? WHERE document_id=?")).run("DELETED", now, documentId);

      var results = this.findAllByDocumentId(documentId);
      results.forEach(function (result) {
        var history = {
          participant_id: result.id,
          type: "DELETE",
          data: JSON.stringify({
            status: "DELETED",
            updated_at: now
          }),
          created_at: now
        };

        _database.db.prepare(_this.historyinsertsql).run(history);
      });
      return delete_result;
    }
  }, {
    key: "updateInvited",
    value: function updateInvited(documentId) {
      var _this2 = this;

      var now = new Date().toISOString();

      var update_result = _database.db.prepare("UPDATE ".concat(this.tableName, " SET STATUS=?, updated_at=? WHERE document_id=?")).run("INVITED", now, documentId);

      var results = this.findAllByDocumentId(documentId);
      results.forEach(function (result) {
        var history = {
          participant_id: result.id,
          type: "INVITE",
          data: JSON.stringify({
            status: "INVITED",
            updated_at: now
          }),
          created_at: now
        };

        _database.db.prepare(_this2.historyinsertsql).run(history);
      });
      return update_result;
    }
  }, {
    key: "readDocument",
    value: function readDocument(participantId) {
      var now = new Date().toISOString();
      var history = {
        participant_id: participantId,
        type: "READ_DOCUMENT",
        data: null,
        created_at: now
      };
      return _database.db.prepare(this.historyinsertsql).run(history);
    }
  }, {
    key: "signDocument",
    value: function signDocument(participantId) {
      var now = new Date().toISOString();

      var sign_result = _database.db.prepare("UPDATE ".concat(this.tableName, " SET STATUS=?, updated_at=? WHERE id=?")).run("SIGNED", now, documentId);

      var history = {
        participant_id: participantId,
        type: "SIGN",
        data: JSON.stringify(raw),
        created_at: now
      };

      _database.db.prepare(this.historyinsertsql).run(history);

      return sign_result;
    }
  }]);
  return ParticipantRepository;
}();

exports.ParticipantRepository = ParticipantRepository;