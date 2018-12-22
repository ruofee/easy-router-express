const fs = require('fs')
const {rules, _error} = require('./config')

module.exports = (app, router, options, ...params) => {
  const {path, prefix, proxy} = options
  let _path = path || `${__dirname}/router`
  let _prefix = prefix || '/'

  app.use(_prefix, router)

  if (proxy) {
    let type = proxy.constructor.name
    let middleFunc = (proxy) => {
      const {func, methods} = proxy
      let _methods = methods.toLowerCase()
      router[_methods]('*', func)
    }
    if (type === 'Array') {
      for (subProxy of proxy) {
        middleFunc(subProxy)
      }
    } else if (type === 'Object') {
      middleFunc(proxy)
    } else {
      console.error(_error('Type of proxy must be Array or Object! If you need to learn more informations about it, please visit at https://github.com/ruofee/easy-router-express'))
    }
  }

  fs.readdir(_path, (err, res) => {
    if (err) {
      console.error(_error(err))
    }
    for (let subPath of res) {
      let stat = fs.statSync(_path)
      if (stat.isDirectory() || rules.test(subPath)) {
        try {
          let route = require(`${_path}/${subPath}`)
          route(router, ...params)
        } catch (err) {
          console.error(_error(`error: ${path}/${subPath}.js or ${path}/${subPath}/index.js is not found`))
        }
      }
    }
  })
}