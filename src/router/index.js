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
  }
]

const init = async app => routes.map(r => app.route(r))

module.exports = init
