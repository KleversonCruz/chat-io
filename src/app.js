import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import io from './sockets.js';
import routes from './routes.js';
import path from 'path';
dotenv.config();

const app = express();
const server = http.createServer(app);
const publicDirectoryPath = path.join(process.cwd(), 'public');

io.attach(server);
app.use('/', routes);
app.use(express.static(publicDirectoryPath));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
