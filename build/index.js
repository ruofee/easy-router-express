const fs = require('fs')
const rules = require('./config').rules

module.exports = (app, router, options, ...params) => {
  const {path, prefix, proxy} = options
  let _path = path || `${__dirname}/router`
  let _prefix = prefix || '/'

  app.use(_prefix, router)

  if (proxy) {
    const {func, methods} = proxy
    let _methods = methods.toLowerCase()

    router[_methods]('*', func)
  }

  fs.readdir(_path, (err, res) => {
    if (err) {
      throw new Error(err)
    }
    for (let subPath of res) {
      let stat = fs.statSync(_path)
      if (stat.isDirectory() || rules.test(subPath)) {
        try {
          let route = require(`${_path}/${subPath}`)
          route(router, ...params)
        } catch (err) {
          console.error(`error: ${path}/${subPath}.js or ${path}/${subPath}/index.js is not found`)
        }
      }
    }
  })
}