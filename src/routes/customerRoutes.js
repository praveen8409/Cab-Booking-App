import express from 'express';
import { requestCab } from '../controllers/customerController.js'; 

const router = express.Router();

router.post('/request-cab', requestCab);

export { router as customerRoutes };
