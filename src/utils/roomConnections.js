const roomConnections = [];

function addConnection(connection) {
  roomConnections.push(connection);
}

function getConnections(roomName) {
  return roomConnections
    .filter((connection) => connection.roomName === roomName)
    .map((connection) => connection.userName);
}

function removeConnection(roomName, userName) {
  const index = roomConnections.findIndex(
    (connection) =>
      connection.roomName === roomName && connection.userName === userName
  );

  if (index !== -1) {
    roomConnections.splice(index, 1);
  }
}

function findUserConnection(roomName, userName) {
  return roomConnections.find(
    (conexao) => conexao.roomName === roomName && conexao.userName === userName
  );
}

export { getConnections, addConnection, removeConnection, findUserConnection };
