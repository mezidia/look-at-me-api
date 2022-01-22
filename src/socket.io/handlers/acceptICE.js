const events = require('../events.js')

function action(args) {
  const { peerId, iceCandidate } = args

  fastify.log.info({
    event: 'ICE',
    peerId: socket.id, 
  })
  
  fastify.io.to(peerId).emit(events.ICE_CANDIDATE, {
    peerId: socket.id,
    iceCandidate,
  });

}

module.exports = action
