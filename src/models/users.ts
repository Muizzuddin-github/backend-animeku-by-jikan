import mongoose from "mongoose";
import schemaHistory from "./history";

const schemaUsers = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  history: [schemaHistory],
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const UsersCol = mongoose.model("users", schemaUsers, "users");
export default UsersCol;
