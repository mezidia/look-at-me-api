const events = require('../events.js')
const { shareRoomsInfo, sendError, getAllRooms } = require('../helpers.js');

function action({ roomId, isNewRoom }) {
  const { rooms: joinedRooms } = socket;

  const allValidRooms = getAllRooms(socket)

  if (Array.from(joinedRooms).includes(roomId)) {
    sendError(fastify, socket, `Already joined to ${roomId}!`)
    return;
  }

  if (!allValidRooms.includes(roomId) && !isNewRoom) {
    sendError(fastify, socket, `Room ${roomId} does not exist!`)
    return;
  }

  const clients = Array.from(fastify.io.sockets.adapter.rooms.get(roomId) || []);

  fastify.log.info(`event: 'JOIN', roomId: ${roomId}, who: ${socket.id}, roomClients: ${clients}`)

  for (const clientId of clients) {
    fastify.io.to(clientId).emit(events.ADD_PEER, {
      peerId: socket.id,
      createOffer: false
    })

    socket.emit(events.ADD_PEER, {
      peerId: clientId,
      createOffer: true
    })
  }

  socket.join(roomId);
  shareRoomsInfo(fastify);

}


module.exports = action
