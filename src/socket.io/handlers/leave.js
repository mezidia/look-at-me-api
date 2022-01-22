const events = require('../events.js')
const { version, validate } = require('uuid')
const { shareRoomsInfo } = require('../helpers.js');

function action({ roomId }) {
  const { rooms } = socket;
  const validRooms = Array.from(rooms).filter(roomId => validate(roomId) && version(roomId) === 4)

  // fastify.log.info({
  //   event: 'LEAVE',
  //   roomId,
  //   clientId: socket.id
  // })

  fastify.log.info(`event: 'LEAVE', roomId: ${roomId}, clientId: ${clientId}`)

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
    socket.leave(roomId);
  }

  shareRoomsInfo(fastify);
}

module.exports = action
