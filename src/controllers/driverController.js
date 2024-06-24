// src/controllers/driverController.js
import { Driver } from '../models/driverModel.js';
import Request from '../models/requestModel.js';

export class DriverController {
  async acceptRequest(req, res) {
    const { requestId, driverId } = req.body;
    try {
      const request = await Request.findById(requestId);
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }

      request.status = 'accepted';
      request.driver = driverId;
      await request.save();

      const driver = await Driver.findById(driverId);
      if (!driver) {
        return res.status(404).json({ message: 'Driver not found' });
      }
      driver.status = 'busy';
      await driver.save();

      req.app.io.emit('requestStatus', { requestId, status: 'accepted', driver });

      res.json({ message: 'Request accepted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async declineRequest(req, res) {
    const { requestId, driverId } = req.body;
    try {
      const request = await Request.findById(requestId);
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }

      request.status = 'declined';
      await request.save();

      const nextDriver = await Driver.findOne({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: request.location.coordinates
            },
            $maxDistance: 15000
          }
        },
        status: 'available'
      });

      if (nextDriver) {
        req.app.io.emit('newRequest', { requestId, location: request.location });
      }

      res.json({ message: 'Request declined successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
