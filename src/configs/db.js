import mongoose from 'mongoose';

// Connection URL
const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.9';

async function connectToMongoDB() {
  try {
    // Connect to the MongoDB server
    await mongoose.connect(url);
    console.log('Connected successfully to MongoDB server');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

export default connectToMongoDB;
