"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseErr_1 = __importDefault(require("../utility/responseErr"));
const verifyToken_1 = __importDefault(require("../utility/verifyToken"));
const users_1 = __importDefault(require("../models/users"));
const isObjectID_1 = __importDefault(require("../utility/isObjectID"));
const onlyLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req;
        const token = req.signedCookies.token;
        if (!token) {
            throw new responseErr_1.default(403, "Silahkan login terlebih dahulu");
        }
        if (!process.env.SECRET_TOKEN) {
            throw new responseErr_1.default(500, "Secret invalid");
        }
        const decode = yield (0, verifyToken_1.default)(token, process.env.SECRET_TOKEN);
        if (!(0, isObjectID_1.default)(decode._id)) {
            throw new responseErr_1.default(403, "Silahkan login terlebih dahulu");
        }
        const checkUser = yield users_1.default.findById(decode._id);
        if (!checkUser) {
            throw new responseErr_1.default(403, "Silahkan login terlebih dahulu");
        }
        customReq._id = decode._id;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.default = onlyLogin;
