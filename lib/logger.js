"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = void 0;

var _constants = require("./constants");

var log = function log(data) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = args.type,
      scope = args.scope;
  var method = console.log;

  if (_constants.allowedTypes.includes(type)) {
    method = console[type];
  }

  if (scope) {
    var scopeString = "[".concat(scope, "]");
    return method(scopeString, data);
  }

  return method(data);
};

exports.log = log;