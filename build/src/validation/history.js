"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class HistorySchema {
    static get addSchema() {
        return joi_1.default.object({
            mal_id: joi_1.default.number().required(),
            url: joi_1.default.string().trim().required(),
            images: joi_1.default.string().trim().required(),
            trailer: joi_1.default.required(),
            title: joi_1.default.string().trim().required(),
            status: joi_1.default.required(),
            score: joi_1.default.required(),
            genres: joi_1.default.array().items(joi_1.default.string()),
            year: joi_1.default.required(),
        });
    }
}
class HistoryValidation extends HistorySchema {
    static add(body) {
        return super.addSchema.validateAsync(body, {
            abortEarly: false,
        });
    }
}
exports.default = HistoryValidation;
