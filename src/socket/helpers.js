const { version, validate } = require('uuid');

const events = require('./events')

function getClientRooms(fastify) {
  const { rooms } = fastify.io.sockets.adapter;

  return Array.from(rooms.keys()).filter(roomID => validate(roomID) && version(roomID) === 4);
}

function shareRoomsInfo(fastify) {
  fastify.io.emit(events.SHARE_ROOMS_INFO, {
    rooms: getClientRooms(fastify)
  })
}

module.exports = {
  getClientRooms,
  shareRoomsInfo,
  // log
}

