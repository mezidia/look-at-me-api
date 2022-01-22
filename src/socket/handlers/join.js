const events = require('../events.js')
const { shareRoomsInfo } = require('../helpers.js');

function action(args) {
  const { roomId } = args
  const { rooms: joinedRooms } = socket;
  fastify.log.warn(`join ${JSON.stringify(roomId)}, ${JSON.stringify(joinedRooms)}`)
  if (Array.from(joinedRooms).includes(roomId)) {
    return console.warn(`Already joined to ${roomId}`);
  }

  const clients = Array.from(fastify.io.sockets.adapter.rooms.get(roomId) || []);
  fastify.log.warn(`clients ${JSON.stringify(clients)}}`)
  for (const clientId of clients) {
    fastify.io.to(clientId).emit(events.ADD_PEER, {
      peerId: socket.id,
      createOffer: false
    })

    socket.emit(events.ADD_PEER, {
      peerId: clientId,
      createOffer: true,
    })
  }

  socket.join(roomId);
  shareRoomsInfo(fastify);

}


module.exports = action
