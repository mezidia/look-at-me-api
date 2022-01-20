const events = require('../events.js')


const action = (args) => {
  const { roomId } = args
  const {rooms: joinedRooms} = socket;

  if (Array.from(joinedRooms).includes(roomId)) {
    return console.warn(`Already joined to ${roomId}`);
  }

  const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

  for (const clientId of clients) {
    fastify.io.to(clientId).emit(events.ADD_PEER, {
      peerID: socket.id,
      createOffer: false
    })

    socket.emit(events.ADD_PEER, {
      peerID: clientID,
      createOffer: true,
    })
  }

  socket.join(roomId);
  shareRoomsInfo(fastify);

}


module.exports = action
