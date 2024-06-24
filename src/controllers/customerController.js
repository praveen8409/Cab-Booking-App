import mongoose from 'mongoose';
import { Customer } from '../models/customerModel.js'; // Adjust the import path as per your actual setup
import Request from '../models/requestModel.js'; // Adjust the import path as per your actual setup

const requestCab = async (req, res) => {
  const { customer_id, location } = req.body;

  try {
    // Validate customer_id
    if (!mongoose.Types.ObjectId.isValid(customer_id)) {
      return res.status(400).json({ message: 'Invalid customer ID' });
    }

    // Find the customer by ID
    const customer = await Customer.findById(customer_id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Create a new request
    const request = new Request({
      customer: customer._id, // Assuming customer._id is already a valid ObjectId
      location: location,
      status: 'pending'
    });

    // Save the request
    await request.save();

    // Emit socket event or perform any other actions as needed

    res.json({ message: 'Request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending request' });
  }
};

export { requestCab }; // Exporting requestCab function
