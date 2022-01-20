const healthCheck = require('./healthCheck')
const testSocket = require('./testSocket')
const room = require('./room')

module.exports = {
  healthCheck,
  testSocket,
  ...room
}
