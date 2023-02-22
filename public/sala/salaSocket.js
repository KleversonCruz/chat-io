import {
  addServerMessageInLogs,
  addUserMessageInLogs,
  updateConnectedUsers,
  throwError,
  loadPageContent,
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

socket.on('reconnect', () =>
  addServerMessageInLogs('Conexão com o servidor recuperada.')
);

socket.on('reconnect_error', () => {
  addServerMessageInLogs('Conexão com o servidor foi perdida.');
});

function emitSubmitMessage(message) {
  socket.emit('submitMessage', message);
}

function emitJoinChat({ roomName, userName }) {
  socket.emit('joinChat', { roomName, userName }, loadPageContent);
}

export { emitSubmitMessage, emitJoinChat };
