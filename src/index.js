require('dotenv').config()
const path = require('path')

const { isProd, appConfig } = require('./config')
const docs = require('./docs')

const app = require('fastify')(appConfig)

app.register(require('fastify-static'), {
  root: path.join(__dirname + '/../'),
  prefix: '/', 
})

fastify.register(require('fastify-cors'), { 
  origin: (origin, cb) => {
    if(/localhost/.test(origin)){
      cb(null, true)
      return
    }
    cb(new Error("Not allowed"))
  }
})
app.register(require('fastify-socket.io'))
app.register(require('./router'))
app.register(require('./socket'))

app.listen(process.env.PORT || 3000, '::', err => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

})
