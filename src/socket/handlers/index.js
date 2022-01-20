const fastify = require('./index.js').fastifyReady

const join = wrapWithFastify(fastify, require('./join'))
const leave =  wrapWithFastify(fastify, require('./leave.js'))

const wrapWithFastify = (fastify, fn) => (...args) => fn(args)

module.exports = {
  join,
  leave
}
