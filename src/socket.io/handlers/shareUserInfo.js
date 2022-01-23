const events = require('../events.js')
const { shareRoomsInfo } = require('../helpers.js');

const action = (socket, fastify, { roomId, nickName, isAdmin }) => {

  const clients = Array.from(fastify.io.sockets.adapter.rooms.get(roomId) || []);

  fastify.log.info(`event: 'SHARE_USER_INFO', who: ${socket.id}, roomId: ${roomId}, nickName: ${nickName}, isAdmin: ${isAdmin}`)

  socket.data = {
    nickName,
    isAdmin,
  }

  clients.forEach(clientId => {
    const clientSocket = fastify.io.sockets.sockets.get(clientId);
    fastify.io.to(clientId).emit(events.ACCEPT_USER_INFO, {
      clientId: socket.id,
      nickName,
      isAdmin,
    });
    socket.emit(events.ACCEPT_USER_INFO, {
      clientId,
      ...clientSocket.data
    });
  });

  shareRoomsInfo(fastify);
}

module.exports = action
