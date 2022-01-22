const handlers = require('./handlers')
const events = require('./events.js');
const { shareRoomsInfo, sendError } = require('./helpers');

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
    fastify.log.info({
      event: 'new connection established',
      id: socket.id
    })

    registerEventsHandlers(socket, fastify);
    
    socket.on('connect_error', sendError);
    socket.on('connect_failed', sendError);
    
    //socket.on('disconnecting', wrapWith(socket, fastify, handlers.leave));
  });

}

module.exports = init

