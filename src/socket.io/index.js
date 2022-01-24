const handlers = require('./handlers');
const events = require('./events.js');
const { shareRoomsInfo } = require('./helpers');
const { version, validate } = require('uuid');

const wrapWith = (socket, fastify, fn) => function(...args) {
  return fn(socket, fastify, ...args);
};

const registerEventsHandlers = (socket, fastify) => {
  for (const event in events) {
    const handlerName = events[event];
    const handler = handlers[handlerName];
    if (handler) {
      socket.on(handlerName, wrapWith(socket, fastify, handler));
    }
  }

};

const handleDisconnecting = (socket, fastify, handlers) => {
  const wrappedLeave = wrapWith(socket, fastify, handlers.leave);
  const { rooms } = socket;
  const validRooms = Array.from(rooms).filter((roomId) => validate(roomId) && version(roomId) === 4);
  for (const roomId of validRooms) {
    const clients = Array.from(fastify.io.sockets.adapter.rooms.get(roomId) || []);
    if (clients.includes(socket.id)) {
      wrappedLeave({ roomId });
    }
  }
};

const init = async (fastify) => {
  shareRoomsInfo(fastify);
  fastify.io.on('connection', (socket) => {
    fastify.log.info(`event: 'new socket connection established', id: ${socket.id}`);

    registerEventsHandlers(socket, fastify);

    socket.on('disconnecting', () => {
      fastify.log.warn(`event: 'disconnecting', clientId: ${socket.id}`);
      handleDisconnecting(socket, fastify, handlers);
    });
  });

};

module.exports = init;

