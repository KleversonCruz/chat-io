import fs from 'fs';

const rooms = JSON.parse(fs.readFileSync('rooms.json'));

function findRoomByName(name) {
  return rooms.find((room) => room.name === name);
}

function findAll() {
  return rooms;
}

export { findAll, findRoomByName };
