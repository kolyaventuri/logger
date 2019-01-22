"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = require("./logger");

var types = _interopRequireWildcard(require("./types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Logger =
/*#__PURE__*/
function () {
  function Logger(scope) {
    _classCallCheck(this, Logger);

    _initialiseProps.call(this);

    this.scope = scope || null;
  }

  _createClass(Logger, [{
    key: "logInfo",
    value: function logInfo(info) {
      this.log(info);
    }
  }, {
    key: "logError",
    value: function logError(error) {
      this.log(error, {
        type: types.ERROR
      });
    }
  }]);

  return Logger;
}();

exports.default = Logger;

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.log = function (data) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var scope = _this.scope;
    var type = args.type;
    type = type || types.INFO;
    (0, _logger.log)(data, {
      type: type,
      scope: scope
    });
  };
};