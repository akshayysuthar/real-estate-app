import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongodb;