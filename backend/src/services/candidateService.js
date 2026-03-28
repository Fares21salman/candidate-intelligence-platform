import Candidate from "../models/Candidate.js";
import mongoose from "mongoose";

export const fetchCandidates = async (queryParams) => {
  const {
    limit = 10,
    cursor,
    search,
    skills,
    experienceMin,
    experienceMax,
    location,
    sortBy = "createdAt",
    order = "desc"
  } = queryParams;

  let query = {};

  // ✅ PARTIAL SEARCH (WORKS FOR TYPING)
  if (search && search.trim() !== "") {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { skills: { $elemMatch: { $regex: search, $options: "i" } } },
      { location: { $regex: search, $options: "i" } }
    ];
  }

  // ✅ FILTERS
  if (skills) {
    query.skills = { $in: skills.split(",") };
  }

  if (location) {
    query.location = location;
  }

  if (experienceMin || experienceMax) {
    query.experience = {};
    if (experienceMin) query.experience.$gte = Number(experienceMin);
    if (experienceMax) query.experience.$lte = Number(experienceMax);
  }

  // ✅ SAFE CURSOR PAGINATION
  if (cursor && mongoose.Types.ObjectId.isValid(cursor)) {
    query._id = { $lt: new mongoose.Types.ObjectId(cursor) };
  }

  const results = await Candidate.find(query)
    .sort({ [sortBy]: order === "desc" ? -1 : 1 })
    .limit(Number(limit));

  return {
    data: results,
    nextCursor: results.length ? results[results.length - 1]._id : null
  };
};