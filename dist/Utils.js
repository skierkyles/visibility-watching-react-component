(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'get-visible-rect'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('get-visible-rect'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.getVisibleRect);
    global.Utils = mod.exports;
  }
})(this, function (exports, _getVisibleRect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RemoveVisibilityWatcher = exports.AddVisibilityWatcher = undefined;

  var _getVisibleRect2 = _interopRequireDefault(_getVisibleRect);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _watchedElements = [];
  var _rateLimiter = null;

  var checkElement = function checkElement(e) {
    var visibility = (0, _getVisibleRect2.default)(e.element);
    var percent = visibility.visibleHeight / visibility.height * 100;

    percent = Math.max(percent, 0);
    percent = Math.min(100, percent);
    e.callback(percent);
  };

  var checkLoop = function checkLoop() {
    var activeElements = _watchedElements.filter(function (i) {
      return i.active;
    });
    activeElements.forEach(checkElement);

    window.clearTimeout(_rateLimiter);
    _rateLimiter = window.setTimeout(function () {
      window.requestAnimationFrame(checkLoop);
    }, 1000 / 12);
  };
  window.requestAnimationFrame(checkLoop);

  var AddVisibilityWatcher = exports.AddVisibilityWatcher = function AddVisibilityWatcher(element, callback) {
    var length = _watchedElements.push({
      element: element,
      callback: callback,
      active: true
    });

    return length - 1;
  };

  var RemoveVisibilityWatcher = exports.RemoveVisibilityWatcher = function RemoveVisibilityWatcher(index) {
    if (_watchedElements[index] != null) {
      _watchedElements[index].active = false;
    }
  };
});