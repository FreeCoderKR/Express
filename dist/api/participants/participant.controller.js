"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _express = require("express");

var _requestHandler = require("../../lib/request-handler.js");

var _participantRepository = require("./participant.repository.js");

var _participantService = require("./participant.service.js");

var ParticipantController = /*#__PURE__*/function () {
  function ParticipantController() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, ParticipantController);
    (0, _defineProperty2["default"])(this, "path", "/participant");
    (0, _defineProperty2["default"])(this, "router", (0, _express.Router)());
    (0, _defineProperty2["default"])(this, "participantService", new _participantService.ParticipantService(new _participantRepository.ParticipantRepository()));
    (0, _defineProperty2["default"])(this, "token", function (req, res) {
      var _req$body = req.body,
          documentId = _req$body.documentId,
          email = _req$body.email;

      var _this$participantServ = _this.participantService.issueAccessToken({
        documentId: documentId,
        email: email
      }),
          _this$participantServ2 = (0, _slicedToArray2["default"])(_this$participantServ, 2),
          token = _this$participantServ2[0],
          participant = _this$participantServ2[1];

      req.session.email = participant.email;
      return {
        token: token,
        participant: participant
      };
    });
    (0, _defineProperty2["default"])(this, "readDocument", function (req, res) {
      throw new Error("Method not implemented.");
    });
    (0, _defineProperty2["default"])(this, "sign", function (req, res) {
      throw new Error("Method not implemented.");
    });
    this.initializeRoutes();
  }

  (0, _createClass2["default"])(ParticipantController, [{
    key: "initializeRoutes",
    value: function initializeRoutes() {
      var router = (0, _express.Router)();
      router.post("/token", (0, _requestHandler.wrap)(this.token)).get("/document", (0, _requestHandler.wrap)(this.readDocument)).post("/sign", (0, _requestHandler.wrap)(this.sign));
      this.router.use(this.path, router);
    }
  }]);
  return ParticipantController;
}();

exports["default"] = ParticipantController;