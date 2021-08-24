"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentService = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = require("../../common/exceptions/index.js");

var jwt = _interopRequireWildcard(require("../../lib/jwt.js"));

var _uuid = require("uuid");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// const disableStatuses = Object.freeze(["CREATED", "DELETED"]);
var DocumentService = /*#__PURE__*/function () {
  function DocumentService(documentRepository, participantRepository) {
    (0, _classCallCheck2["default"])(this, DocumentService);
    this.documentRepository = documentRepository;
    this.participantRepository = participantRepository;
  }

  (0, _createClass2["default"])(DocumentService, [{
    key: "createDocument",
    value: function createDocument(title, content, userId, participants) {
      var _this = this;

      console.log("create");
      var id = (0, _uuid.v4)();
      var now = new Date().toISOString();
      var document_input = {
        id: id,
        userId: userId,
        title: title,
        content: content,
        status: "CREATED",
        created_at: now,
        updated_at: now
      };
      this.documentRepository.create(document_input);
      this.documentRepository.insertDocumentHistory(document_input);
      participants.forEach(function (element) {
        var name = element.name,
            email = element.email;

        if (!name || !email) {
          throw new BadRequestException("참가자는 모두의 이름과 이메일이 기입되어있어야 합니다.");
        }

        var participantId = (0, _uuid.v4)();
        var participant_input = {
          id: participantId,
          documentId: id,
          name: name,
          email: email,
          status: "CREATED",
          created_at: now,
          updated_at: now
        };

        _this.participantRepository.create(participant_input);
      });
      return id;
    }
  }, {
    key: "readAllDocument",
    value: function readAllDocument() {// const result = this.documentRepository.findAll();
      // console.log(result);
    }
  }, {
    key: "readDocument",
    value: function readDocument(userId, documentId) {
      if (documentId == null || documentId == "") {
        throw new _index.NotFoundException();
      }

      var document = this.documentRepository.findOne(documentId);

      if (!document) {
        throw new _index.NotFoundException();
      } else {
        if (userId != document.userId || !userId) {
          throw new ForbiddenException();
        }

        var participants = this.participantRepository.findAllByDocumentId(documentId);
        document.participants = participants.map(function (participant) {
          return participant.toJson();
        });
        return document;
      }
    }
  }, {
    key: "removeDocument",
    value: function removeDocument(id) {
      var result = this.documentRepository["delete"](id);

      if (result.changes == 1) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "publishDocument",
    value: function publishDocument(id) {
      var result = this.documentRepository.updatePublish(id);

      if (result.changes == 1) {
        this.participantRepository.updateInvited(id);
        return true;
      } else {
        return false;
      }
    }
  }]);
  return DocumentService;
}();

exports.DocumentService = DocumentService;