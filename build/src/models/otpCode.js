"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schemaUsers = new mongoose_1.default.Schema({
    otp: {
        type: String,
        required: true,
        unique: true,
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
const OtpCodeCol = mongoose_1.default.model("otpcode", schemaUsers, "otpcode");
exports.default = OtpCodeCol;
