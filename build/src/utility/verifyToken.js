"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseErr_1 = __importDefault(require("./responseErr"));
function verifyToken(token, secret) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(new responseErr_1.default(400, "Token sudah kadaluarsa"));
                return;
            }
            if (!decoded) {
                reject(new responseErr_1.default(400, "Invalid token"));
                return;
            }
            if (typeof decoded === "object") {
                if ("_id" in decoded ||
                    ("username" in decoded && "email" in decoded && "password" in decoded)) {
                    resolve(decoded);
                }
                else {
                    reject(new responseErr_1.default(400, "Token tidak valid"));
                }
            }
            else {
                reject(new responseErr_1.default(400, "Token tidak valid"));
            }
        });
    });
}
exports.default = verifyToken;
