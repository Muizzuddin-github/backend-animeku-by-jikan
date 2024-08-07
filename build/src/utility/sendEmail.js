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
exports.Email = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class Email {
    constructor(config) {
        this.from = "";
        this.to = "";
        this.subject = "";
        this.html = "";
        this.from = config.from;
        this.to = config.to;
        this.subject = config.subject;
        this.html = config.html;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                requireTLS: true,
                auth: {
                    user: process.env.SECRET_EMAIL_SENDER,
                    pass: process.env.SECRET_EMAIL_AUTH,
                },
            });
            const info = yield transporter.sendMail({
                from: this.from,
                to: this.to,
                subject: this.subject,
                html: this.html,
            });
            return info;
        });
    }
}
exports.Email = Email;
