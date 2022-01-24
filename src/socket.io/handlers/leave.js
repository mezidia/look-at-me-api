const events = require('../events.js');
const { version, validate } = require('uuid');
const { shareRoomsInfo } = require('../helpers.js');

const action = (socket, fastify, { roomId }) => {
  const { rooms } = socket;
  const validRooms = Array.from(rooms).filter((roomId) => validate(roomId) && version(roomId) === 4);

  fastify.log.info(`event: 'LEAVE', roomId: ${roomId}, clientId: ${socket.id}`);

  for (const roomId of validRooms) {
    const clients = Array.from(fastify.io.sockets.adapter.rooms.get(roomId) || []);

    clients.forEach((clientId) => {
      fastify.io.to(clientId).emit(events.REMOVE_PEER, {
        peerId: socket.id,
      });

      socket.emit(events.REMOVE_PEER, {
        peerId: clientId,
      });
    });
    socket.leave(roomId);
  }

  const clients = Array.from(fastify.io.sockets.adapter.rooms.get(roomId) || []);

  if (socket.data.isAdmin && clients.length) {
    const newAdminClientId = clients[0];
    const newAdminSocket = fastify.io.sockets.sockets.get(newAdminClientId);

    fastify.log.info(`event: 'new admin', new admin: ${newAdminClientId}`);
    newAdminSocket.emit(events.ACCEPT_USER_INFO, {
      clientId: newAdminClientId,
      ...newAdminSocket.data,
      isAdmin: true
    });
  }

  shareRoomsInfo(fastify);
};

module.exports = action;
