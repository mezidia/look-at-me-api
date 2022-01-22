const handlers = require('./handlers')
const events = require('./events.js');
const { version, validate } = require('uuid');
const { shareRoomsInfo } = require('./helpers');
const { default: fastify } = require('fastify');

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

function handleDisconnecting(fastify, socket) {
  const wrappedLeave = wrapWith(socket, fastify, handlers.leave);
  const { rooms } = socket;
  fastify.log.info('handleDisconnecting');
  const validRooms = Array.from(rooms).filter(roomId => validate(roomId) && version(roomId) === 4);
  for (const roomId of validRooms) {
    const clients = Array.from(fastify.io.sockets.adapter.rooms.get(roomId) || []);
    fastify.log.info(`roomId ${roomId}, clients ${clients}`)
    if (clients.includes(socket.id)) {
      fastify.log.info('includes')
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
    registerEventsHandlers(socket, fastify)
    
    socket.on('disconnecting', () => handleDisconnecting(fastify, socket));
  });

}

module.exports = init

