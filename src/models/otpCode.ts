import mongoose from "mongoose";

const schemaUsers = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  otpToken: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    default: new Date(),
  },
});

const OtpCodeCol = mongoose.model("otpcode", schemaUsers, "otpcode");
export default OtpCodeCol;
