import express from 'express';
import { findAll } from './services/roomServices.js';
import { getConnections } from './utils/roomConnections.js';

const router = express.Router();

router.get('/room', (req, res) => {
  const rooms = findAll();

  const roomsWithConnections = rooms.map((room) => {
    const connections = getConnections(room.name);
    return { ...room, connectedUser: connections.length };
  });
  res.json(roomsWithConnections);
});

export default router;
