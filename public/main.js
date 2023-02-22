import { hideContent, showContent } from './utils.js';

loadPageContent();

const modalJoinRoom = document.getElementById('modalJoinRoom');
const formJoinRoom = document.getElementById('formJoinRoom');
const roomList = document.getElementById('roomList');

modalJoinRoom.addEventListener('shown.bs.modal', function (event) {
  const button = event.relatedTarget;
  const roomName = button.getAttribute('data-bs-room');

  const modalTitle = modalJoinRoom.querySelector('.modal-title');
  const inputRoomName = modalJoinRoom.querySelector('#inputRoomName');
  const inputNickname = modalJoinRoom.querySelector('#inputNickname');

  modalTitle.textContent = `Entrar em ${roomName}`;
  inputRoomName.value = roomName;
  inputNickname.focus();
});

formJoinRoom.addEventListener('submit', (event) => {
  event.preventDefault();

  const roomName = formJoinRoom['inputRoomName'].value;
  const nickName = formJoinRoom['inputNickname'].value;

  sessionStorage.setItem('nickName', nickName);
  window.location.href = `/sala/?nome=${roomName}`;
});

async function loadPageContent() {
  hideContent();

  try {
    const response = await fetch('/room');

    if (response.status === 200) {
      const rooms = await response.json();
      rooms.forEach((room) => {
        addRoomInList(room);
      });
      showContent();
    }
  } catch (error) {
    console.error(error.message);
  }
}

function addRoomInList(room) {
  roomList.innerHTML += `
    <a class="list-group-item list-group-item-action"
      data-bs-toggle="modal"
      data-bs-target="#modalJoinRoom"
      data-bs-room="${room.name}"
      href="#"
    >
      <div class="d-flex justify-content-between">
        <div>${room.name}</div>
        <div>${room.connectedUser}/${room.maxCapacity}</div>
      </div>
    </a>
  `;
}
