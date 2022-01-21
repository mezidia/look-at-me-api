const events = require('../events.js')
const { shareRoomsInfo } = require('../helpers.js');

function action(args) {
  const { roomId } = args
  const { rooms: joinedRooms } = socket;

  if (Array.from(joinedRooms).includes(roomId)) {
    return console.warn(`Already joined to ${roomId}`);
  }

  const clients = Array.from(fastify.io.sockets.adapter.rooms.get(roomId) || []);

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

  socket.emit(events.ADD_PEER, {
    peerId: 'clientId',
    createOffer: true,
  })

  socket.join(roomId);
  shareRoomsInfo(fastify);

}


module.exports = action
