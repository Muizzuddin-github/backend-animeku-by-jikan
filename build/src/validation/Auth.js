"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class Schema {
    static get registerSchema() {
        return joi_1.default.object({
            username: joi_1.default.string().trim().required().min(3).max(20),
            email: joi_1.default.string().trim().email().required(),
            password: joi_1.default.string().trim().min(6).max(255).required(),
        });
    }
    static get registerSaveSchema() {
        return joi_1.default.object({
            otp: joi_1.default.string()
                .trim()
                .min(6)
                .max(6)
                .custom((value, helpers) => {
                const regex = /^[0-9]+$/;
                if (!regex.test(value)) {
                    return helpers.error("string.onlyDigits");
                }
                return value;
            })
                .messages({
                "string.onlyDigits": "Otp code must be a number",
            })
                .required(),
        });
    }
    static get loginSchema() {
        return joi_1.default.object({
            email: joi_1.default.string().trim().email().required(),
            password: joi_1.default.string().trim().min(6).required(),
        });
    }
}
class AuthValidation extends Schema {
    static register(body) {
        return super.registerSchema.validateAsync(body, {
            abortEarly: false,
        });
    }
    static registerSave(body) {
        return super.registerSaveSchema.validateAsync(body, {
            abortEarly: false,
        });
    }
    static login(body) {
        return super.loginSchema.validateAsync(body, {
            abortEarly: false,
        });
    }
}
exports.default = AuthValidation;
