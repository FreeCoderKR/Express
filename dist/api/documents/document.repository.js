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
  }

  (0, _createClass2["default"])(DocumentRepository, [{
    key: "findOne",
    value: function findOne(id) {
      var raw = _database.db.prepare("SELECT * FROM ".concat(this.tableName, " WHERE id = ?")).get(id);

      return _document.Document.fromJson(raw);
    }
  }, {
    key: "findAll",
    value: function findAll() {
      var raw = _database.db.prepare("SELECT * FROM ".concat(this.tableName));

      return _document.Document.fromJson(raw);
    }
  }, {
    key: "create",
    value: function create(raw) {
      return _database.db.prepare(["INSERT INTO", this.tableName, "(id, user_id, title, content, status, created_at, updated_at)", "VALUES", "($id, $userId, $title, $content, $status, $created_at, $updated_at)"].join(" ")).run(raw);
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      console.log(id);
      return _database.db.prepare("DELETE FROM ".concat(this.tableName, " WHERE id = ? ")).run(id);
    }
  }, {
    key: "updatePublish",
    value: function updatePublish(id) {
      return _database.db.prepare("UPDATE ".concat(this.tableName, " SET STATUS=PUBLISH WHERE id=?")).run(id);
    }
  }, {
    key: "insertDocumentHistory",
    value: function insertDocumentHistory(raw) {
      var newraw = {
        document_id: raw.id,
        type: "CREATE",
        data: JSON.stringify(raw),
        created_at: raw.created_at
      };
      return _database.db.prepare(["INSERT INTO", this.historyTableName, "(document_id, type, data, created_at)", "VALUES", "($document_id, $type, $data, $created_at)"].join(" ")).run(newraw);
    }
  }]);
  return DocumentRepository;
}();

exports.DocumentRepository = DocumentRepository;