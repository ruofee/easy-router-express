'use strict';

var colors = require('colors');
var name = 'easy-router-express';

module.exports = {
  name: name,
  rules: /\.js$/,
  _error: function _error(message) {
    var error = new Error(message);
    var title = name + ' catch a error: ';
    var stack = error.stack.slice(error.stack.indexOf('\n') + 1);
    return colors.red(title + message + '\n' + stack);
  }
};