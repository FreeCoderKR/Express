"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _express = require("express");

var _badRequestException = require("../../common/exceptions/bad-request.exception.js");

var _forbiddenException = require("../../common/exceptions/forbidden.exception.js");

var _notFoundException = require("../../common/exceptions/not-found.exception.js");

var _requestHandler = require("../../lib/request-handler.js");

var _participantRepository = require("../participant/participant.repository.js");

var _documentRepository = require("./document.repository.js");

var _documentService = require("./document.service.js");

var _documentEntity = require("./entities/document.entity.js");

var DocumentController = /*#__PURE__*/function () {
  function DocumentController() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, DocumentController);
    (0, _defineProperty2["default"])(this, "path", "/documents");
    (0, _defineProperty2["default"])(this, "router", (0, _express.Router)());
    (0, _defineProperty2["default"])(this, "documentService", new _documentService.DocumentService(new _documentRepository.DocumentRepository(), new _participantRepository.ParticipantRepository()));
    (0, _defineProperty2["default"])(this, "create", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, title, content, participants, userId, newId;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, title = _req$body.title, content = _req$body.content, participants = _req$body.participants; //??????, ??????, ????????? ??????, ????????? ??????, ???????????????,

                if (title) {
                  _context.next = 3;
                  break;
                }

                throw new _badRequestException.BadRequestException("?????? ????????? ???????????????.");

              case 3:
                if (content) {
                  _context.next = 5;
                  break;
                }

                throw new _badRequestException.BadRequestException("?????? ????????? ???????????????.");

              case 5:
                if (!(participants.length < 2 || participants.length > 10)) {
                  _context.next = 7;
                  break;
                }

                throw new _badRequestException.BadRequestException("???????????? ?????? 2???, ?????? 10????????????");

              case 7:
                userId = req.session.id;
                newId = _this.documentService.createDocument(title, content, userId, participants);
                return _context.abrupt("return", {
                  documentId: newId
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])(this, "findOne", function (req, res) {
      var documentId = req.params.documentId;
      var userId = req.session.id;

      var document = _this.documentService.readDocument(userId, documentId);

      return document.toJson();
    });
    (0, _defineProperty2["default"])(this, "findAll", function (req, res) {
      var offset = req.query.offset;
      var size = req.query.size;

      if (!offset || offset < 0 || offset > Number.MAX_SAFE_INTEGER) {
        offset = 0;
      }

      if (!size || size < 1 || size > 5) {
        size = 5;
      }

      _this.documentService.readAllDocument(offset, size);
    });
    (0, _defineProperty2["default"])(this, "publish", function (req, res) {
      var documentId = req.params.documentId;
      var userId = req.session.id;

      var document = _this.documentService.readDocument(userId, documentId);

      if (document.status != "CREATED") {
        throw new _badRequestException.BadRequestException("CREATED ????????? ????????? ?????? ???????????????.");
      }

      return _this.documentService.publishDocument(documentId);
    });
    (0, _defineProperty2["default"])(this, "remove", function (req, res) {
      var documentId = req.params.documentId;
      var userId = req.session.id;

      var document = _this.documentService.readDocument(userId, documentId);

      if (document.status != "CREATED") {
        throw new _badRequestException.BadRequestException("CREATED ????????? ????????? ?????? ???????????????.");
      }

      return _this.documentService.removeDocument(documentId);
    });
    this.initializeRoutes();
  }

  (0, _createClass2["default"])(DocumentController, [{
    key: "initializeRoutes",
    value: function initializeRoutes() {
      var router = (0, _express.Router)();
      router.post("/", (0, _requestHandler.wrap)(this.create)).get("/", (0, _requestHandler.wrap)(this.findAll)).get("/:documentId", (0, _requestHandler.wrap)(this.findOne))["delete"]("/:documentId", (0, _requestHandler.wrap)(this.remove)).post("/:documentId/publish", (0, _requestHandler.wrap)(this.publish));
      this.router.use(this.path, router);
    }
  }]);
  return DocumentController;
}();

exports["default"] = DocumentController;