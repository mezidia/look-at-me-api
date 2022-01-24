const { version, validate } = require('uuid');

const events = require('./events');

function getClientRooms(fastify) {
  const { rooms } = fastify.io.sockets.adapter;
  return Array.from(rooms.keys()).filter((roomID) => validate(roomID) && version(roomID) === 4);
}

function shareRoomsInfo(fastify) {
  fastify.io.emit(events.SHARE_ROOMS_INFO, {
    rooms: getClientRooms(fastify)
  });
}

function getAllRooms(socket) {
  return Array.from(socket.adapter.rooms.keys()).filter((roomId) => validate(roomId) && version(roomId) === 4);
}

function sendError(fastify, socket, msg) {
  fastify.log.warn(`event: 'ERROR', clientId: ${socket.id}, msg: '${msg}'`);
  fastify.io.to(socket.id).emit(events.ERROR, {
    msg
  });
}

module.exports = {
  getClientRooms,
  shareRoomsInfo,
  sendError,
  getAllRooms,

};

