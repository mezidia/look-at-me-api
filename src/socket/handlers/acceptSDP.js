const events = require('../events.js')

function action(args) {
  const { peerId, sessionDescription } = args

  fastify.io.to(peerId).emit(events.SESSION_DESCRIPTION, {
    peerId: socket.id,
    sessionDescription,
  });

}

module.exports = action
