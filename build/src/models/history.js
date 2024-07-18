"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schemaHistory = new mongoose_1.default.Schema({
    mal_id: {
        type: Number,
        required: true,
    },
    url: String,
    images: String,
    trailer: String,
    title: String,
    status: String,
    score: Number,
    year: Number,
    genres: [],
    created_at: {
        type: Date,
        default: Date.now,
    },
});
exports.default = schemaHistory;
