import mongoose from "mongoose";

const schemaHistory = new mongoose.Schema({
  mal_id: {
    type: Number,
    unique: true,
  },
  url: String,
  images: String,
  trailer: String,
  title: String,
  status: String,
  score: Number,
  year: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default schemaHistory;
