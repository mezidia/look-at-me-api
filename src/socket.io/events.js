const EVENTS = {
  JOIN: 'join',
  ADD_PEER: 'addPeer',
  SHARE_ROOMS_INFO: 'shareRoomsInfo',
  REMOVE_PEER: 'removePeer',
  LEAVE: 'leave',
  ACCEPT_SDP: 'acceptSDP',
  ACCEPT_ICE: 'acceptICE',
  ICE_CANDIDATE: 'ice',
  SESSION_DESCRIPTION: 'sdp',
  SHARE_USER_INFO: 'shareUserInfo',
  ACCEPT_USER_INFO: 'acceptUserInfo',
  ERROR: 'error',
};

module.exports = EVENTS;
