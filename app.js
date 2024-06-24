import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { customerRoutes } from './src/routes/customerRoutes.js';
import { driverRoutes } from './src/routes/driverRoutes.js';
import { customerSocket } from './src/sockets/customerSocket.js';
import { driverSocket } from './src/sockets/driverSocket.js';
import connectToMongoDB from './src/configs/db.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.use('/customer', customerRoutes);
app.use('/driver', driverRoutes);

connectToMongoDB();

customerSocket(io);
driverSocket(io);

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
