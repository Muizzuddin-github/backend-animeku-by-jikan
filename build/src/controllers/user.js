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
const users_1 = __importDefault(require("../models/users"));
const history_1 = __importDefault(require("../validation/history"));
const isObjectID_1 = __importDefault(require("../utility/isObjectID"));
const responseErr_1 = __importDefault(require("../utility/responseErr"));
const mongoose_1 = __importDefault(require("mongoose"));
const userControl = {
    addHistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const body = req.body;
                yield history_1.default.add(body);
                const checkAnime = yield users_1.default.aggregate([
                    {
                        $match: {
                            _id: new mongoose_1.default.Types.ObjectId(customReq._id),
                            history: { $elemMatch: { mal_id: body.mal_id } },
                        },
                    },
                ]);
                if (checkAnime.length === 0) {
                    yield users_1.default.updateOne({ _id: customReq._id }, {
                        $push: {
                            history: body,
                        },
                    });
                }
                const r = {
                    message: "Anime berhasil ditambahkan",
                };
                res.status(200).send(r);
            }
            catch (err) {
                next(err);
            }
        });
    },
    delHistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                if (!(0, isObjectID_1.default)(req.params.id)) {
                    throw new responseErr_1.default(400, "Invalid");
                }
                yield users_1.default.updateOne({ _id: customReq._id }, {
                    $pull: {
                        history: {
                            _id: req.params.id,
                        },
                    },
                });
                const r = {
                    message: "Berhasil hapus histori",
                };
                res.status(200).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    },
    getHistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customReq = req;
                const histories = yield users_1.default.aggregate([
                    {
                        $match: {
                            _id: new mongoose_1.default.Types.ObjectId(customReq._id),
                        },
                    },
                    {
                        $unwind: "$history",
                    },
                    { $sort: { "history.created_at": -1 } },
                    {
                        $project: {
                            _id: 0,
                            email: 0,
                            password: 0,
                            created_at: 0,
                        },
                    },
                ]);
                const r = {
                    message: "Semua data history",
                    data: histories,
                };
                res.status(200).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    },
};
exports.default = userControl;
