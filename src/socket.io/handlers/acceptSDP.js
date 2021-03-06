const events = require('../events.js');

function action(socket, fastify, { peerId, from, sessionDescription }) {
  fastify.log.info(`event: 'SDP', SDP_type: ${sessionDescription.type}, peerId: ${peerId}`);

  fastify.io.to(peerId).emit(events.SESSION_DESCRIPTION, {
    peerId: socket.id,
    from,
    sessionDescription,
  });

}

module.exports = action;
