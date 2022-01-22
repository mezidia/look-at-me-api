const events = require('../events.js')
const { shareRoomsInfo } = require('../helpers.js');

function action({ roomId }) {
  const { rooms: joinedRooms } = socket;

  if (Array.from(joinedRooms).includes(roomId)) {
    return console.warn(`Already joined to ${roomId}`);
  }

  const clients = Array.from(fastify.io.sockets.adapter.rooms.get(roomId) || []);

  fastify.log.info({
    event: 'JOIN',
    roomId,
    peerId: socket.id,
    roomClients: clients
  })

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
