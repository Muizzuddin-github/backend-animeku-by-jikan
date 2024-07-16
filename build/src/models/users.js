"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const history_1 = __importDefault(require("./history"));
const schemaUsers = new mongoose_1.default.Schema({
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
    history: [history_1.default],
    created_at: {
        type: Date,
        default: new Date(),
    },
});
const UsersCol = mongoose_1.default.model("users", schemaUsers, "users");
exports.default = UsersCol;
