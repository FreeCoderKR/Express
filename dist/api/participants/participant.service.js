"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticipantService = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = require("../../common/exceptions/index.js");

var jwt = _interopRequireWildcard(require("../../lib/jwt.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var disableStatuses = Object.freeze(["CREATED", "DELETED"]);

var ParticipantService = /*#__PURE__*/function () {
  function ParticipantService(participantRepository) {
    (0, _classCallCheck2["default"])(this, ParticipantService);
    this.participantRepository = participantRepository;
  }

  (0, _createClass2["default"])(ParticipantService, [{
    key: "issueAccessToken",
    value: function issueAccessToken(_ref) {
      var documentId = _ref.documentId,
          email = _ref.email;
      var participant = this.participantRepository.findByDocumentIdAndEmail(documentId, email);

      if (!participant || disableStatuses.includes(participant.status)) {
        throw new _index.NotFoundException("참가자 정보를 찾을 수 없습니다.");
      }

      var token = jwt.sign({
        participant_id: participant.id,
        email: participant.email
      });
      return [token, participant.toJson()];
    }
  }]);
  return ParticipantService;
}();

exports.ParticipantService = ParticipantService;