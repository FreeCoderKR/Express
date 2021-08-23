"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _express = _interopRequireWildcard(require("express"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _authMiddleware = require("./middlewares/auth.middleware.js");

var _csrfMiddleware = require("./middlewares/csrf.middleware.js");

var _errorMiddleware = require("./middlewares/error.middleware.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var App = /*#__PURE__*/function () {
  function App(controllers) {
    (0, _classCallCheck2["default"])(this, App);
    (0, _defineProperty2["default"])(this, "app", void 0);
    this.app = (0, _express["default"])();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  (0, _createClass2["default"])(App, [{
    key: "listen",
    value: function listen() {
      var port = process.env.PORT || 5000;
      this.app.listen(port, function () {
        console.log("App listening on the port ".concat(port));
      });
    }
  }, {
    key: "getServer",
    value: function getServer() {
      return this.app;
    }
  }, {
    key: "initializeMiddlewares",
    value: function initializeMiddlewares() {
      this.app.use(_express["default"].json());
      this.app.use((0, _expressSession["default"])({
        name: "prgrms.sid",
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true
      }));
      this.app.use((0, _csrfMiddleware.csrf)());
      this.app.use(_authMiddleware.verifyJWT);
    }
  }, {
    key: "initializeErrorHandling",
    value: function initializeErrorHandling() {
      this.app.use(_errorMiddleware.errorMiddleware);
    }
  }, {
    key: "initializeControllers",
    value: function initializeControllers(controllers) {
      var router = (0, _express.Router)();
      router.get("/", function (req, res) {
        return res.send("OK");
      });
      controllers.forEach(function (controller) {
        router.use(controller.router);
      });
      this.app.use("/api", router);
    }
  }]);
  return App;
}();

var _default = App;
exports["default"] = _default;