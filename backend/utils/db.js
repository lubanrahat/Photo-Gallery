import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb conneced successfully ✅");
  } catch (error) {
    console.error("Error mongodb connection ❌", error);
  }
};

export default connectDB;
