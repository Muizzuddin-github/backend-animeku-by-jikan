"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseErr_1 = __importDefault(require("../utility/responseErr"));
const joi_1 = __importDefault(require("joi"));
const mongodb_1 = require("mongodb");
const errorHandling = (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }
    if (err instanceof responseErr_1.default) {
        res.status(err.getStatusCode).json({ errors: [err.message] });
        return;
    }
    else if (err instanceof joi_1.default.ValidationError) {
        res.status(400).json({ errors: err.message.split(".") });
        return;
    }
    else if (err instanceof mongodb_1.MongoError && err.code === 11000) {
        res.status(400).json({ errors: [err.message] });
        return;
    }
    res.status(500).json({ erros: [err.message] });
    return;
};
exports.default = errorHandling;
