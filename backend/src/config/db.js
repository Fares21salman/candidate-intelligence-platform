// src/config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/candidates");
  console.log("MongoDB connected");
};