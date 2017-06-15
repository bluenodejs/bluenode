const Koa = require('koa')
const Router = require('koa-router')
const cors = require('kcors')
const body = require('koa-body')
const logger = require('koa-logger')
const debug = require('debug')('bluenode:backend')

const { Registry, Node } = require('@bluenode/core')

const registry = new Registry()

const PORT = parseInt(process.env.PORT, 10) || 3000

const app = new Koa()
const router = new Router()

router.get('/add', (ctx) => {
  registry.addNode(new Node())
  ctx.body = 'created'
})

router.get('/', ctx => {
  ctx.body = `count: ${registry.nodes.size}`
})

app.use(logger())
app.use(cors())
app.use(body())

app.use(router.routes(), router.allowedMethods())

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}...`)
})
