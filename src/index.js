require('dotenv').config()

const { isProd, appConfig } = require('./config')

const app = require('fastify')(appConfig)

app.register(require('fastify-socket.io'), {
  cors: {
    origin: 'http://localhost:3000',//isProd ? 'http://look-at-me-ws.herokuapp.com/' : 'http://localhost:3000',
    methods: ['GET']
  }
})
app.register(require('./router'))
app.register(require('./socket.io'))

app.listen(process.env.PORT || 8000, '::', err => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
