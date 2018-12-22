## easy-router-express

**easy-router-express** is writed for building a easy router for express

## Support

- Express

## Installation

```terminal
npm install easy-router-express
# or yarn
yarn add easy-router-express
```

## Getting started

**Use in Express**

```javascript
EasyRouter(app, router, options, ...params)
```

**app**

```javascript
const app = new require('express')()
```

**router**

```javascript
const router = new require('express').Router()
```

**options**

| Attribute | Description           | Type         | Default                 |
| --------- | --------------------- | ------------ | ----------------------- |
| Path      | Router Folder 's Path | String       | \`${__dirname}/router\` |
| Prefix    | Router 's Prefix      | String       | Null                    |
| Proxy     | Router 's Proxy       | Object/Array | Null                    |

**Proxy**

| Attribute | Type     | Example                          |
| --------- | -------- | -------------------------------- |
| method    | String   | 'POST'                           |
| Func      | Function | `(req, res, next) => { next() }` |

## Example

server.js

```javascript
const Express = require('express')
const EasyRouter = require('easy-router-express')
const app = new Express()
const router = new Express.Router()
const path = __dirname + '/router'

EasyRouter(app, router, {
  path,
  prefix: '/api',
  proxy: {
    method: 'POST',
    func (req, res, next) {
      next()
    }
  }
})

app.listen(3000, () => {
  console.log('please visit http://localhost:3000')
})
```

router/demo.js

```Javascript
module.exports = (router) => {
  router.get('/test', (req, res) => {
    console.log('this is a demo')
    res.status(200).send('OK')
  })
}
```

