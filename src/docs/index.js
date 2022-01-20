const { version } = require('../../package')

const config = {
  routePrefix: '/',
  openapi: {
    info: {
      title: 'Training Center API',
      description: 'API doc for Training Center Project',
      version
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    tags: [
      {
        name: 'Health Check',
        description: 'check if system works'
      }
    ]
  },
  exposeRoute: true
}

module.exports = config
