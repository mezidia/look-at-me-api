require('dotenv').config()
const path = require('path')

const { isProd, appConfig } = require('./config')
const docs = require('./docs')

const app = require('fastify')(appConfig)

app.register(require('fastify-static'), {
  root: path.join(__dirname + '/../'),
  prefix: '/', 
})

app.register(require('fastify-socket.io'))
app.register(require('./router'))


app.listen(process.env.PORT || 3000, '::', err => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.io.on("connection", (socket) => {
    app.log.warn('new user')
  });

})
