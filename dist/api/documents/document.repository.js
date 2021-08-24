"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentRepository = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _database = require("../../lib/database.js");

var _document = require("./entities/document.entity");

var DocumentRepository = /*#__PURE__*/function () {
  function DocumentRepository() {
    (0, _classCallCheck2["default"])(this, DocumentRepository);
    (0, _defineProperty2["default"])(this, "tableName", "documents");
    (0, _defineProperty2["default"])(this, "historyTableName", "document_histories");
    (0, _defineProperty2["default"])(this, "historyinsertsql", "INSERT INTO ".concat(this.historyTableName, " (document_id, type, data, created_at) VALUES ($document_id, $type, $data, $created_at)"));
  }

  (0, _createClass2["default"])(DocumentRepository, [{
    key: "findOne",
    value: function findOne(id) {
      var raw = _database.db.prepare("SELECT * FROM ".concat(this.tableName, " WHERE id = ?")).get(id);

      return _document.Document.fromJson(raw);
    }
  }, {
    key: "findAll",
    value: function findAll(offset, size) {
      var rows = _database.db.prepare("SELECT * FROM ".concat(this.tableName, " LIMIT ? OFFSET ?")).all(offset, size);

      rows = rows.map(function (row) {
        return _document.Document.fromJson(row);
      });
      return rows;
    }
  }, {
    key: "create",
    value: function create(raw) {
      var now = new Date().toISOString();

      var create_result = _database.db.prepare(["INSERT INTO", this.tableName, "(id, user_id, title, content, status, created_at, updated_at)", "VALUES", "($id, $userId, $title, $content, $status, $created_at, $updated_at)"].join(" ")).run(raw);

      var history = {
        document_id: raw.id,
        type: "CREATE",
        data: JSON.stringify(raw),
        created_at: now
      };

      _database.db.prepare(this.historyinsertsql).run(history);

      return create_result;
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var now = new Date().toISOString();

      var delete_result = _database.db.prepare("UPDATE ".concat(this.tableName, " SET status=?, updated_at=? WHERE id=?")).run("DELETED", now, id);

      var history = {
        document_id: id,
        type: "DELETE",
        data: JSON.stringify({
          status: "DELETED",
          updated_at: now
        }),
        created_at: now
      };

      _database.db.prepare(this.historyinsertsql).run(history);

      return delete_result;
    }
  }, {
    key: "updatePublish",
    value: function updatePublish(id) {
      var now = new Date().toISOString();

      var update_result = _database.db.prepare("UPDATE ".concat(this.tableName, " SET STATUS=?, updated_at=?  WHERE id=?")).run("PUBLISHED", now, id);

      var history = {
        document_id: id,
        type: "PUBLISH",
        data: JSON.stringify({
          status: "PUBLISHED",
          updated_at: now
        }),
        created_at: now
      };

      _database.db.prepare(this.historyinsertsql).run(history);

      return update_result;
    }
  }]);
  return DocumentRepository;
}();

exports.DocumentRepository = DocumentRepository;