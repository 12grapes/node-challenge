const app = require('./app')
const port = process.env.PORT || 3000

const httpServer = app
  .listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
  .on('error', err => {
    console.error(err)
  })

module.exports = httpServer
