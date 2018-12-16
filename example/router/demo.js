module.exports = (router) => {
  router.get('/test', (req, res) => {
    console.log('this is a demo')
    res.status(200).send('OK')
  })
}