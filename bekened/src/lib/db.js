import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB has connected successfully : ${conn.connection.host}`);
  } catch (err) {
    console.log(` Something went wrong while connecting to MongoDB: ${err}`);
  }
};