"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _express = require("express");

var _requestHandler = require("../../lib/request-handler.js");

var DocumentController = /*#__PURE__*/function () {
  function DocumentController() {
    (0, _classCallCheck2["default"])(this, DocumentController);
    (0, _defineProperty2["default"])(this, "path", "/documents");
    (0, _defineProperty2["default"])(this, "router", (0, _express.Router)());
    (0, _defineProperty2["default"])(this, "create", function (req, res) {
      throw new Error("Method not implemented.");
    });
    (0, _defineProperty2["default"])(this, "findOne", function (req, res) {
      throw new Error("Method not implemented.");
    });
    (0, _defineProperty2["default"])(this, "findAll", function (req, res) {
      throw new Error("Method not implemented.");
    });
    (0, _defineProperty2["default"])(this, "publish", function (req, res) {
      throw new Error("Method not implemented.");
    });
    (0, _defineProperty2["default"])(this, "remove", function (req, res) {
      throw new Error("Method not implemented.");
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