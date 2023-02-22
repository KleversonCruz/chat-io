import { emitSubmitMessage, emitJoinChat } from './salaSocket.js';

joinChat();

const listConnectedUsers = document.getElementById('listConnectedUsers');
const formSendMessage = document.getElementById('formSendMessage');
const messageLogs = document.getElementById('messageLogs');
const buttonLeaveChat = document.getElementById('buttonLeaveChat');

function joinChat() {
  const params = new URLSearchParams(window.location.search);
  const roomName = params.get('nome');
  const userName = sessionStorage.getItem('nickName');

  if (!userName || !roomName) {
    window.location.href = '/';
  }

  loadPageDetails(roomName);
  emitJoinChat({ roomName, userName });
}

function loadPageDetails(roomName) {
  const roomTitle = document.getElementById('roomTitle');
  document.title = roomName;
  roomTitle.innerHTML = roomName;
}

function updateConnectedUsers(connectedUsers) {
  listConnectedUsers.innerHTML = '';

  connectedUsers.forEach((user) => {
    listConnectedUsers.innerHTML += `
      <li class="list-group-item">${user}</li>`;
  });
}

formSendMessage.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = formSendMessage['inputMessage'].value;
  const user = 'Você';
  addUserMessageInLogs(user, message);
  emitSubmitMessage(message);
  formSendMessage['inputMessage'].value = '';
});

buttonLeaveChat.addEventListener('click', () => {
  sessionStorage.removeItem('nickName');
  window.location.href = '/';
});

function addUserMessageInLogs(user, message, messageAlign = 'end') {
  messageLogs.innerHTML += `
    <div class="d-flex justify-content-${messageAlign} m-2">
      <div class="p-3 border rounded">
        <p class="small mb-0">${user}:<br>${message}</p>
      </div>
    </div>`;

  messageLogs.scrollTop = messageLogs.scrollHeight - messageLogs.clientHeight;
}

function addServerMessageInLogs(message) {
  messageLogs.innerHTML += `
  <div class="d-flex m-2 justify-content-center">
    <p class="small">${message}</p>
  </div>`;
  messageLogs.scrollTop = messageLogs.scrollHeight - messageLogs.clientHeight;
}

function throwError(errorMessage) {
  alert(errorMessage);
  window.location.href = '/';
}

export {
  updateConnectedUsers,
  addServerMessageInLogs,
  addUserMessageInLogs,
  throwError,
};
