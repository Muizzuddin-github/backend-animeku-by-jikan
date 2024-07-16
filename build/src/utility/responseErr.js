"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseErr extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
    get getStatusCode() {
        return this.statusCode;
    }
}
exports.default = ResponseErr;
