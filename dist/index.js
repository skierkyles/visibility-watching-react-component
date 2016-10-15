(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-dom', './Utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-dom'), require('./Utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactDom, global.Utils);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _reactDom, _Utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  /**
   * Watches an element, and sets a prop 'visibility'.
   * Sets the estimated percent of the element visible in the viewport.
   *
   * To use, wrap your export with this function. Ex:
   *
   * export default WatchVisibility(MyFavoriteComponent);
   */
  var WatchVisibility = function WatchVisibility(ComposedComponent) {
    return function (_React$Component) {
      _inherits(_class2, _React$Component);

      function _class2(props) {
        _classCallCheck(this, _class2);

        var _this = _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this, props));

        _this.onVisibilityChange = function (percentVisible) {
          if (percentVisible !== _this.state.visibility) {
            _this.setState({
              visibility: percentVisible
            });
          }
        };

        _this.state = {
          visibility: 0
        };

        _this.watcher = null;
        return _this;
      }

      _createClass(_class2, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var element = _reactDom2.default.findDOMNode(this);
          this.watcher = (0, _Utils.AddVisibilityWatcher)(element, this.onVisibilityChange);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          (0, _Utils.RemoveVisibilityWatcher)(this.watcher);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(ComposedComponent, _extends({}, this.props, { visibility: this.state.visibility }));
        }
      }]);

      return _class2;
    }(_react2.default.Component);
  };

  exports.default = WatchVisibility;
});