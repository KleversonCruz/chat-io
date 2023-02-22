import { Server } from 'socket.io';
import { findRoomByName } from './services/roomServices.js';
import {
  addConnection,
  findUserConnection,
  getConnections,
  removeConnection,
} from './utils/roomConnections.js';

const io = new Server();

io.on('connection', (socket) => {
  socket.on('joinChat', ({ roomName, userName }) => {
    joinChat(socket, roomName, userName);
  });
});

function joinChat(socket, roomName, userName) {
  const room = findRoomByName(roomName);

  if (!room) {
    socket.emit('roomDoesntExist', 'Sala não encontrada.');
    return;
  }

  if (isUserAlreadyJoined(roomName, userName)) {
    socket.emit('userAlreadyJoined', 'Já existe usuário com mesmo nome.');
    return;
  }

  if (isRoomFull(roomName)) {
    socket.emit(
      'roomReachedMaxCapacity',
      'A sala atingiu o máximo de usuários'
    );
    return;
  }

  socket.join(roomName);

  addConnection({ userName, roomName });
  const usersInRoom = getConnections(roomName);

  sendWelcomeMessage(socket);
  broadcastUserConnectedMessage(roomName, userName);
  broadcastUsersInRoom(roomName, usersInRoom);
  listenForMessages(socket, roomName, userName);
  listenForDisconnection(socket, roomName, userName);
}

function isUserAlreadyJoined(roomName, userName) {
  const userAlreadyJoined = findUserConnection(roomName, userName);
  return !!userAlreadyJoined;
}

function isRoomFull(roomName) {
  const room = findRoomByName(roomName);
  const connections = getConnections(roomName);
  return connections.length === room.maxCapacity;
}

function sendWelcomeMessage(socket, roomName) {
  socket.emit('welcomeMessage', `Bem-vindo à sala de bate-papo ${roomName}.`);
}

function broadcastUserConnectedMessage(roomName, userName) {
  io.to(roomName).emit('userConnected', `${userName} entrou na sala.`);
}

function broadcastUsersInRoom(roomName, usersInRoom) {
  io.to(roomName).emit('usersInRoom', usersInRoom);
}

function listenForMessages(socket, roomName, userName) {
  socket.on('submitMessage', (msg) => {
    socket.broadcast.to(roomName).emit('messageReceived', { msg, userName });
  });
}

function listenForDisconnection(socket, roomName, userName) {
  socket.on('disconnect', () => {
    removeConnection(roomName, userName);
    const usersInRoom = getConnections(roomName);
    broadcastUsersInRoom(socket, roomName, usersInRoom);
    broadcastUserDisconnectionMessage(roomName, userName);
  });
}

function broadcastUserDisconnectionMessage(roomName, userName) {
  io.to(roomName).emit('userDisconnect', `${userName} saiu da sala.`);
}

export default io;
