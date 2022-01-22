const events = require('../events.js')
const { shareRoomsInfo } = require('../helpers.js');

function action({ roomId, nickName, isAdmin }) {

  const clients = Array.from(fastify.io.sockets.adapter.rooms.get(roomId) || []);
  // fastify.log.info({
  //   event: 'SHARE_USER_INFO',
  //   roomId,
  //   roomClients: clients,
  //   caller: socket.id,
  //   nickName,
  //   isAdmin
  // })

  fastify.log.info(`event: 'SHARE_USER_INFO', roomId: ${roomId}, nickName: ${nickName}, isAdmin: ${isAdmin}`)

  clients.forEach(clientId => {
    fastify.io.to(clientId).emit(events.ACCEPT_USER_INFO, {
      clientId,
      nickName,
      isAdmin,
    });

    socket.emit(events.ACCEPT_USER_INFO, {
      clientId,
      nickName,
      isAdmin,
    });
  });

  shareRoomsInfo(fastify);
}

module.exports = action
