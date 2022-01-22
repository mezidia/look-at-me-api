const events = require('../events.js')

function action(args) {
  const { peerId, from, sessionDescription } = args
  fastify.log.warn(`send sdp type ${JSON.stringify(sessionDescription.type)} from ${JSON.stringify(socket.id)} to ${JSON.stringify(peerId)}`)
  fastify.io.to(peerId).emit(events.SESSION_DESCRIPTION, {
    peerId: socket.id,
    from,
    sessionDescription,
  });

}

module.exports = action
