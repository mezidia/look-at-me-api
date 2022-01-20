const events = require('../events.js')


const action = (args) => {
  const { rooms } = socket;

  const validRooms = Array.from(rooms).filter(roomId => validate(roomId) && version(roomId) === 4)

  for (const roomId of validRooms) {
    const clients = Array.from(fastify.io.sockets.adapter.rooms.get(roomId) || []);
    
    clients.forEach(clientId => {
      fastify.io.to(clientId).emit(events.REMOVE_PEER, {
        peerId: socket.id,
      });

      socket.emit(events.REMOVE_PEER, {
        peerId: clientId,
      });
    });

  }

  socket.leave(roomId);
  shareRoomsInfo();
}

module.exports = action
