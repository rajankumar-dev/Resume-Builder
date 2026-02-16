import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      family: 4,
      serverSelectionTimeoutMS: 30000
    });
    console.log("DB CONNECTED");
  } catch (e) {
    console.log("Error in DB connection:", e.message);
  }
};
