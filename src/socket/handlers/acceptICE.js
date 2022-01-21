const events = require('../events.js')

function action(args) {
  const { peerId, iceCandidate } = args
  fastify.log.warn('acceptICE')
  fastify.io.to(peerId).emit(events.ICE_CANDIDATE, {
    peerId: socket.id,
    iceCandidate,
  });

}

module.exports = action
