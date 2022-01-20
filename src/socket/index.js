const handlers = require('./handlers')
const events = require('./events.js');
const { shareRoomsInfo } = require('./helpers');

let fastifyReady = undefined

const registerEventsHandlers = (socket, fastify) => {
  for (const event in events) {
    const handlerName = events[event];
    if (handlers[handlerName]) {
      fastify.io.on(event, handlers[handlerName].bind({socket, fastify}));
    }
  }

}

const init = (fastify) => {
  fastifyReady = fastify;

  shareRoomsInfo(fastify); 
  fastify.io.on('connection', (socket) => {
    registerEventsHandlers(socket, fastify)
    socket.on('disconnecting', handlers.leave);
  });
}

module.exports = {
  fastifyReady,
  init
}
