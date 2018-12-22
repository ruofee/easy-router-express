const colors = require('colors')
const name = 'easy-router-express'

module.exports = {
  name,
  rules: /\.js$/,
  _error: (message) => {
    let error = new Error(message)
    let title = `${name} catch a error: `
    let stack = error.stack.slice(error.stack.indexOf('\n') + 1)
    return colors.red(title + message + '\n' + stack)
  }
}