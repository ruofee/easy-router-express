const Express = require('express')
const EasyRouter = require('../lib/index.js')
const app = new Express()
const router = new Express.Router()
const path = __dirname + '/router'

EasyRouter(app, router, {
  path
})

app.listen(3000, () => {
  console.log('please visit http://localhost:3000')
})