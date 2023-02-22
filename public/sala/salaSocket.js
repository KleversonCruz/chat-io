import {
  addServerMessageInLogs,
  addUserMessageInLogs,
  updateConnectedUsers,
  throwError,
} from './sala.js';

const socket = io();
socket.on('welcomeMessage', addServerMessageInLogs);
socket.on('userConnected', addServerMessageInLogs);
socket.on('userDisconnect', addServerMessageInLogs);

socket.on('messageReceived', ({ userName, msg }) =>
  addUserMessageInLogs(userName, msg, 'start')
);

socket.on('usersInRoom', updateConnectedUsers);

socket.on('roomDoesntExist', throwError);
socket.on('userAlreadyJoined', throwError);
socket.on('roomReachedMaxCapacity', throwError);

socket.on('disconnect', () =>
  throwError('Conexão com o servidor foi perdida.')
);

function emitSubmitMessage(message) {
  socket.emit('submitMessage', message);
}

function emitJoinChat({ roomName, userName }) {
  socket.emit('joinChat', { roomName, userName });
}

export { emitSubmitMessage, emitJoinChat };
