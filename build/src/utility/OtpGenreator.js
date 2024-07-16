"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const otpGenerator = (num = 6) => {
    let otp = "";
    const n = "123456789";
    for (let i = 0; i < num; i++) {
        const index = Math.floor(Math.random() * 6);
        otp += n[index];
    }
    return otp;
};
exports.default = otpGenerator;
