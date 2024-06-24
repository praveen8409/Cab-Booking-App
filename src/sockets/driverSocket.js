import Request from '../models/requestModel.js';
import { Driver } from '../models/driverModel.js';

export function driverSocket(io) {
  io.on('connection', (socket) => {
    console.log('Driver connected');

    socket.on('disconnect', () => {
      console.log('Driver disconnected');
    });

    socket.on('registerDriver', async (driverData) => {
      try {
        let driver = await Driver.findById(driverData.id);
        if (!driver) {
          driver = new Driver({ ...driverData, socketId: socket.id });
        } else {
          driver.location = driverData.location;
          driver.socketId = socket.id;
        }
        await driver.save();
        console.log(`Driver ${driver.id} registered`);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('acceptRequest', async (data) => {
      try {
        const request = await Request.findById(data.requestId);
        if (request) {
          request.status = 'accepted';
          request.driver = data.driverId;
          await request.save();
          const driver = await Driver.findById(data.driverId);
          io.to(request.customer.socketId).emit('requestStatus', { status: 'accepted', driver });
        }
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('declineRequest', async (data) => {
      try {
        const request = await Request.findById(data.requestId);
        if (request) {
          request.status = 'declined';
          await request.save();
          io.to(request.customer.socketId).emit('requestStatus', { status: 'declined' });
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
}
