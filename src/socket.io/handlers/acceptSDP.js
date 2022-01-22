const events = require('../events.js')

function action({ peerId, from, sessionDescription }) {
  // fastify.log.info({
  //   event: 'SDP',
  //   SDP_type: sessionDescription.type,
  //   from,
  //   peerId: socket.id
  // })

  fastify.log.info(`event: 'SDP', SDP_type: ${sessionDescription.type}, peerId: ${peerId}`)

  fastify.io.to(peerId).emit(events.SESSION_DESCRIPTION, {
    peerId: socket.id,
    from,
    sessionDescription,
  });

}

module.exports = action
