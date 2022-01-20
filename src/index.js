require('dotenv').config()

const { isProd, appConfig } = require('./config')
const docs = require('./docs')

const app = require('fastify')(appConfig)

isProd || app.register(require('fastify-swagger'), docs)
app.register(require('./router'))

app.listen(process.env.PORT || 3000, '::', err => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  isProd || app.swagger()
})
