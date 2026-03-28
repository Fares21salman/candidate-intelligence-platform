// src/models/Candidate.js
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  skills: [String],
  experience: Number,
  location: String,
  resumeText: String
}, { timestamps: true });

schema.index({ resumeText: "text" });

export default mongoose.model("Candidate", schema);