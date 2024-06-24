// src/models/driverModel.js
import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  id: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  status: { type: String, enum: ['available', 'busy'], default: 'available' },
  socketId: { type: String }
});

const Driver = mongoose.model('Driver', driverSchema);

export { Driver };
