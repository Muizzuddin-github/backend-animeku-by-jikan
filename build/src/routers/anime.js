"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const anime_1 = __importDefault(require("../controllers/anime"));
const anime = express_1.default.Router();
anime.get("/api/anime/search/:src", anime_1.default.search);
exports.default = anime;
