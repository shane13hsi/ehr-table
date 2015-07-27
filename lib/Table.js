'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var simpleGet = function simpleGet(key) {
  return function (data) {
    return data[key];
  };
};
var keyGetter = function keyGetter(keys) {
  return function (data) {
    return keys.map(function (key) {
      return data[key];
    });
  };
};
var isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

var getCellValue = function getCellValue(_ref, row) {
  var prop = _ref.prop;
  var defaultContent = _ref.defaultContent;
  var render = _ref.render;

  var rtv = undefined;
  if (!isEmpty(prop) && isEmpty(row[prop])) {
    rtv = defaultContent;
  } else if (render) {
    rtv = render(row[prop], row);
  } else {
    rtv = row[prop];
  }
  return rtv;
};

var getCellClass = function getCellClass(_ref2, row) {
  var prop = _ref2.prop;
  var className = _ref2.className;

  var rtv = undefined;
  if (!isEmpty(prop) && isEmpty(row[prop])) {
    rtv = 'empty cell';
  } else if (typeof className === 'function') {
    rtv = className(row[prop], row);
  } else {
    rtv = className;
  }
  return rtv;
};

// todo: 监控是否出 bug
var _headers = [];

var Table = _react2['default'].createClass({
  displayName: 'Table',

  componentDidMount: function componentDidMount() {
    // If no width was specified, then set the width that the browser applied
    // initially to avoid recalculating width between pages.
    _headers.forEach(function (header) {
      var thDom = _react2['default'].findDOMNode(header);
      if (!thDom.style.width) {
        thDom.style.width = thDom.offsetWidth + 'px';
      }
    });
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var columns = _props.columns;
    var dataArray = _props.dataArray;
    var keys = _props.keys;

    var headers = columns.map(function (col, idx) {
      return _react2['default'].createElement(
        'th',
        {
          ref: function (c) {
            return _headers[idx] = c;
          },
          key: idx,
          style: { width: col.width },
          role: 'columnheader',
          scope: 'col' },
        _react2['default'].createElement(
          'span',
          null,
          col.title
        )
      );
    });
    var getKeys = Array.isArray(keys) ? keyGetter(keys) : simpleGet(keys);
    var rows = dataArray.map(function (row) {
      return _react2['default'].createElement(
        'tr',
        { key: getKeys(row) },
        columns.map(function (col, i) {
          return _react2['default'].createElement(
            'td',
            { key: i, className: getCellClass(col, row) },
            getCellValue(col, row)
          );
        })
      );
    });
    return _react2['default'].createElement(
      'table',
      { className: className },
      _react2['default'].createElement(
        'thead',
        null,
        _react2['default'].createElement(
          'tr',
          null,
          headers
        )
      ),
      _react2['default'].createElement(
        'tbody',
        null,
        rows.length > 0 ? rows : _react2['default'].createElement(
          'tr',
          null,
          _react2['default'].createElement(
            'td',
            { colSpan: columns.length, className: 'text-center' },
            this.props.noDataText || '没有数据'
          )
        )
      )
    );
  }
});

Table.propTypes = {
  className: _react.PropTypes.string,

  columns: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    title: _react.PropTypes.string.isRequired,
    prop: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    render: _react.PropTypes.func,
    defaultContent: _react.PropTypes.string,
    width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    className: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func])
  })).isRequired,

  dataArray: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]).isRequired,

  keys: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.string]),

  noDataText: _react.PropTypes.string
};

exports['default'] = Table;
module.exports = exports['default'];