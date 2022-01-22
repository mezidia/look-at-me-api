const handlers = require('./handlers')
const events = require('./events.js');
const { shareRoomsInfo, sendError } = require('./helpers');
const { version, validate } = require('uuid');

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

function handleDisconnecting() {
  const wrappedLeave = wrapWith(socket, fastify, handlers.leave);
  const { rooms } = socket;
  const validRooms = Array.from(rooms).filter(roomId => validate(roomId) && version(roomId) === 4);
  for (const roomId of validRooms) {
    const clients = Array.from(fastify.io.sockets.adapter.rooms.get(roomId) || []);
    if (clients.includes(socket.id)) {
      wrappedLeave({ roomId });
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
    //FIXME: wrong usage!
    // socket.on('connect_error', sendError);
    // socket.on('connect_failed', sendError);
    
    socket.on('disconnecting', () => {
      fastify.log.warn(`event: 'disconnecting', clientId: ${socket.id}`);
      handleDisconnecting()
    });
  });

}

module.exports = init

