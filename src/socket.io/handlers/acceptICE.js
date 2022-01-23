const events = require('../events.js')

function action(socket, fastify, { peerId, iceCandidate }) {

  // fastify.log.info({
  //   event: 'ICE',
  //   peerId: socket.id, 
  // })
  
  fastify.log.info(`event: 'ICE', peerId: ${peerId}`)

  fastify.io.to(peerId).emit(events.ICE_CANDIDATE, {
    peerId: socket.id,
    iceCandidate,
  });

}

module.exports = action
