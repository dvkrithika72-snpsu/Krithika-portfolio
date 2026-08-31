import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB URI provided in .env, otherwise fallback to local MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
    
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.warn(`WARNING: The server is starting without a database connection. Authentication and contact form features will be disabled.`);
  }
};

export default connectDB;
