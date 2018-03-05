const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { health } = require('./routes')

const app = new Koa()

// TODO: implement a logging middleware
/**
app.use(() => async (ctx, next) => {
  await next()
})
*/

// Middlewares
app.use(bodyParser())

// Routes
app.use(health.routes()).use(health.allowedMethods())

// TODO: implement an error handler
/**
app.use(() => async (ctx, next) => {
  await next()
})
*/

module.exports = app
