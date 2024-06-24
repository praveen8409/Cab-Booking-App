import Request from '../models/requestModel.js';

export function customerSocket(io) {
  io.on('connection', (socket) => {
    console.log('Customer connected');

    socket.on('disconnect', () => {
      console.log('Customer disconnected');
    });

    socket.on('requestStatus', async (customerId) => {
      try {
        const request = await Request.findOne({ customer: customerId }).populate('driver');
        if (!request) {
          return socket.emit('requestStatus', { status: 'not found' });
        }
        const status = request.status;
        const driver = request.driver;
        socket.emit('requestStatus', { status, driver });
      } catch (error) {
        console.error(error);
        socket.emit('requestStatus', { status: 'error' });
      }
    });
  });
}
