const methods = require('./methods')
const urls = require('./routes')
const schemas = require('../schemas')
const actions = require('../actions')

const routes = [
  {
    method: methods.GET,
    url: urls.HEALTH_CHECK,
    schema: schemas.healthCheck,
    handler: actions.healthCheck
  },
  {
    method: methods.GET,
    url: urls.TEST,
    // schema: schemas.healthCheck,
    handler: actions.testSocket
  },
  //room
  {
    method: methods.GET,
    url: urls.ROOM,
    schema: schemas.joinRoom,
    handler: actions.joinRoom
  },
]

const init = async app => routes.map(r => app.route(r))

module.exports = init
