const events = require('../events.js')

function action(args) {
  const { peerId, from, sessionDescription } = args

  fastify.log.info({
    event: 'SDP',
    SDP_type: sessionDescription.type,
    from,
    peerId: socket.id
  })

  fastify.io.to(peerId).emit(events.SESSION_DESCRIPTION, {
    peerId: socket.id,
    from,
    sessionDescription,
  });

}

module.exports = action
