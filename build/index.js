'use strict';

var fs = require('fs');

var _require = require('./config'),
    rules = _require.rules,
    _error = _require._error;

module.exports = function (app, router, options) {
  for (var _len = arguments.length, params = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }

  var path = options.path,
      prefix = options.prefix,
      proxy = options.proxy;

  var _path = path || __dirname + '/router';
  var _prefix = prefix || '/';

  app.use(_prefix, router);

  if (proxy) {
    var type = proxy.constructor.name;
    var middleFunc = function middleFunc(proxy) {
      var func = proxy.func,
          method = proxy.method;

      var _method = method.toLowerCase();
      router[_method]('*', func);
    };
    if (type === 'Array') {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = proxy[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          subProxy = _step.value;

          middleFunc(subProxy);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else if (type === 'Object') {
      middleFunc(proxy);
    } else {
      console.error(_error('Type of proxy must be Array or Object! If you need to learn more informations about it, please visit at https://github.com/ruofee/easy-router-express'));
    }
  }

  fs.readdir(_path, function (err, res) {
    if (err) {
      console.error(_error(err));
    }
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = res[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var subPath = _step2.value;

        var stat = fs.statSync(_path);
        if (stat.isDirectory() || rules.test(subPath)) {
          try {
            var route = require(_path + '/' + subPath);
            route.apply(undefined, [router].concat(params));
          } catch (err) {
            console.error(_error(err));
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
};