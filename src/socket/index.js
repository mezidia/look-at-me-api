const handlers = require('./handlers')
const events = require('./events.js');
const { shareRoomsInfo } = require('./helpers');

function wrapWith(socket, fastify, fn) {
  this.socket = socket
  this.fastify = fastify
  return (...args) => fn(...args)
}

const registerEventsHandlers = (socket, fastify) => {
  for (const event in events) {
    const handlerName = events[event];
    const handler = handlers[handlerName]
    if (handler) {
      socket.on(handlerName, wrapWith(socket, fastify, handler));
    }
  }

}

const init = async (fastify) => {
  shareRoomsInfo(fastify);
  fastify.io.on('connection', (socket) => {
    fastify.log.info('new user')
    registerEventsHandlers(socket, fastify)
    
    socket.on('disconnecting', wrapWith(socket, fastify, handlers.leave));
  });

}

module.exports = init

