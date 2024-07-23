"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const anime_1 = __importDefault(require("./routers/anime"));
const errorHandling_1 = __importDefault(require("./middlewares/errorHandling"));
const auth_1 = __importDefault(require("./routers/auth"));
const user_1 = __importDefault(require("./routers/user"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://animeku-two.vercel.app", "http://localhost:5173"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)("secret"));
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.send("okeh");
});
app.use(auth_1.default);
app.use(anime_1.default);
app.use(user_1.default);
app.use(errorHandling_1.default);
exports.default = app;
