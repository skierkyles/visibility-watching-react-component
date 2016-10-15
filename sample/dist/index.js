(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['react', 'react-dom', '../../dist/index'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('react'), require('react-dom'), require('../../dist/index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.react, global.reactDom, global.index);
    global.index = mod.exports;
  }
})(this, function (_react, _reactDom, _index) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _index2 = _interopRequireDefault(_index);

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

  var TEXT_STYLE = {
    textAlign: 'center',
    fontFamily: 'system, Helvetica, sans',
    color: 'white',
    fontSize: '120px'
  };

  var WatchMe = function WatchMe(props) {
    return _react2.default.createElement(
      'div',
      { style: { backgroundColor: 'teal', position: 'relative' } },
      _react2.default.createElement(
        'h1',
        { style: _extends({}, TEXT_STYLE, { padding: '150px 0', margin: 0 }) },
        Math.round(props.visibility) + '%'
      )
    );
  };
  var WatchMeWrapper = (0, _index2.default)(WatchMe);

  var Header = function Header(props) {
    var o = props.visibility / 100;
    return _react2.default.createElement(
      'h1',
      { style: _extends({}, TEXT_STYLE, { color: 'black', opacity: o }) },
      'React Vizibility Watcher'
    );
  };
  var MagicHeader = (0, _index2.default)(Header);

  var Spacer = function Spacer(props) {
    return _react2.default.createElement('div', { style: { height: '50vh', backgroundColor: props.color } });
  };

  var App = function App() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(MagicHeader, null),
      _react2.default.createElement(Spacer, { color: 'maroon' }),
      _react2.default.createElement(WatchMeWrapper, null),
      _react2.default.createElement(Spacer, { color: 'olive' }),
      _react2.default.createElement(WatchMeWrapper, null),
      _react2.default.createElement(Spacer, { color: 'navy' }),
      _react2.default.createElement(WatchMeWrapper, null)
    );
  };

  _reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));
});