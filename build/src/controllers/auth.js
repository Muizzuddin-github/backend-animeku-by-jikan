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
const sendEmail_1 = require("../utility/sendEmail");
const Auth_1 = __importDefault(require("../validation/Auth"));
const OtpGenreator_1 = __importDefault(require("../utility/OtpGenreator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const responseErr_1 = __importDefault(require("../utility/responseErr"));
const otpCode_1 = __importDefault(require("../models/otpCode"));
const users_1 = __importDefault(require("../models/users"));
const verifyToken_1 = __importDefault(require("../utility/verifyToken"));
const isObjectID_1 = __importDefault(require("../utility/isObjectID"));
const authControl = {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                yield Auth_1.default.register(body);
                const checkUser = yield users_1.default.findOne({ email: body.email });
                if (checkUser) {
                    throw new responseErr_1.default(400, "Email sudah ada");
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashPassword = yield bcrypt_1.default.hash(body.password, salt);
                body.password = hashPassword;
                if (!process.env.SECRET_OTP) {
                    throw new responseErr_1.default(500, "Secret Otp Invalid");
                }
                const otp = (0, OtpGenreator_1.default)();
                const otpToken = jsonwebtoken_1.default.sign({
                    username: body.username,
                    email: body.email,
                    password: body.password,
                }, process.env.SECRET_OTP, {
                    expiresIn: "10m",
                });
                const config = {
                    from: "History Anime",
                    to: body.email,
                    subject: "OTP Code",
                    html: `<b>code otp berlaku 10 menit 
        </b>
        <p>code otp anda : ${otp}</p>`,
                };
                const email = new sendEmail_1.Email(config);
                const info = yield email.send();
                const saveOtpCode = new otpCode_1.default({
                    otp: otp,
                    otpToken: otpToken,
                });
                yield saveOtpCode.save();
                const r = {
                    message: "Silahkan periksa email anda",
                    messageId: info.messageId,
                };
                res.status(200).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    },
    registerSave(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                yield Auth_1.default.registerSave(body);
                const otpDb = yield otpCode_1.default.findOne({
                    otp: body.otp,
                });
                if (!otpDb) {
                    throw new responseErr_1.default(404, "Code otp anda tidak valid");
                }
                if (otpDb.otp !== body.otp) {
                    throw new responseErr_1.default(400, "Periksa code otp anda");
                }
                if (!process.env.SECRET_OTP) {
                    throw new responseErr_1.default(500, "Secret otp invalid");
                }
                const decoded = yield (0, verifyToken_1.default)(otpDb.otpToken, process.env.SECRET_OTP);
                const checkUser = yield users_1.default.findOne({ email: decoded.email });
                if (checkUser) {
                    throw new responseErr_1.default(400, "Code otp anda tidak valid");
                }
                const userSave = new users_1.default({
                    username: decoded.username,
                    email: decoded.email,
                    password: decoded.password,
                });
                yield userSave.save();
                yield otpCode_1.default.deleteOne({
                    otp: body.otp,
                });
                const r = {
                    message: "Registrasi berhasil",
                };
                res.status(201).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    },
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                yield Auth_1.default.login(body);
                const checkUser = yield users_1.default.findOne({
                    email: body.email,
                });
                if (!checkUser) {
                    throw new responseErr_1.default(404, "Periksa email atau assword anda");
                }
                const checkPassword = yield bcrypt_1.default.compare(body.password, checkUser.password);
                if (!checkPassword) {
                    throw new responseErr_1.default(404, "Periksa email atau assword anda");
                }
                if (!process.env.SECRET_TOKEN) {
                    throw new responseErr_1.default(500, "Secret token invalid");
                }
                const token = jsonwebtoken_1.default.sign({
                    _id: checkUser._id.toString(),
                }, process.env.SECRET_TOKEN, {
                    expiresIn: "1d",
                });
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 86400 * 1000,
                    priority: "high",
                    secure: true,
                    signed: true,
                });
                const r = {
                    message: "Berhasil login",
                };
                res.status(200).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    },
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie("token", "", {
                    httpOnly: true,
                    maxAge: 0,
                    priority: "high",
                    secure: true,
                    signed: true,
                });
                const r = {
                    message: "Berhasil logout",
                };
                res.status(200).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    },
    isLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                const r = {
                    message: "User is logined",
                    username: checkUser.username,
                };
                res.status(200).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
exports.default = authControl;
