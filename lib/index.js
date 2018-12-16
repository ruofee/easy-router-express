'use strict';

var fs = require('fs');
var rules = require('./config').rules;

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
    var func = proxy.func,
        methods = proxy.methods;

    var _methods = methods.toLowerCase();

    router[_methods]('*', func);
  }

  fs.readdir(_path, function (err, res) {
    if (err) {
      throw new Error(err);
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = res[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var subPath = _step.value;

        var stat = fs.statSync(_path);
        if (stat.isDirectory() || rules.test(subPath)) {
          try {
            var route = require(_path + '/' + subPath);
            route.apply(undefined, [router].concat(params));
          } catch (err) {
            console.error('error: ' + path + '/' + subPath + '.js or ' + path + '/' + subPath + '/index.js is not found');
          }
        }
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
  });
};