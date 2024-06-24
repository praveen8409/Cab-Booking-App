// src/models/customerModel.js
import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  }
});

const Customer = mongoose.model('Customer', customerSchema);

export { Customer };
