"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const onlyLogin_1 = __importDefault(require("../middlewares/onlyLogin"));
const users = express_1.default.Router();
users.get("/api/user/history", onlyLogin_1.default, user_1.default.getHistory);
users.post("/api/user/history", onlyLogin_1.default, user_1.default.addHistory);
users.delete("/api/user/history/:id", onlyLogin_1.default, user_1.default.delHistory);
exports.default = users;
