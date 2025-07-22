import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'mern-auth'  // optional if db name is not in URI
    });

    console.log('✅ MongoDB connection established successfully');

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // exit process on failure
  }
};

export default connectDB;
