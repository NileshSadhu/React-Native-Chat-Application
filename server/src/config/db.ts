import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Database connected Successfully.");
  } catch (error) {
    console.log("Failed to Connect DB : ", error);
    process.exit(1);
  }
};

export default connectDB;
