import express from 'express';
import { DriverController } from '../controllers/driverController.js';

const router = express.Router();
const driverController = new DriverController();

router.post('/acceptRequest', driverController.acceptRequest);
router.post('/declineRequest', driverController.declineRequest);

export { router as driverRoutes };