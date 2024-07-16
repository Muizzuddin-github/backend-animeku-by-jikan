import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../types/expressCustom";
import UsersCol from "../models/users";
import { RequestBodyHistory } from "../requestBody/history";
import HistoryValidation from "../validation/history";
import isObjectID from "../utility/isObjectID";
import ResponseErr from "../utility/responseErr";
import { ResponseBodyData, ResponseBodyMsg } from "../responseBody/response";
import mongoose from "mongoose";
import { ResponseHistory } from "../responseBody/history";

const userControl = {
  async addHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq = req as CustomRequest;
      const body: RequestBodyHistory = req.body;
      await HistoryValidation.add(body);

      const checkAnime = await UsersCol.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(customReq._id),
            history: { $elemMatch: { mal_id: body.mal_id } },
          },
        },
      ]);

      if (checkAnime.length === 0) {
        await UsersCol.updateOne(
          { _id: customReq._id },
          {
            $push: {
              history: body,
            },
          }
        );
      }

      const r: ResponseBodyMsg = {
        message: "Anime berhasil ditambahkan",
      };
      res.status(200).send(r);
    } catch (err) {
      next(err);
    }
  },

  async delHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq = req as CustomRequest;

      if (!isObjectID(req.params.id)) {
        throw new ResponseErr(400, "Invalid");
      }

      await UsersCol.updateOne(
        { _id: customReq._id },
        {
          $pull: {
            history: {
              _id: req.params.id,
            },
          },
        }
      );

      const r: ResponseBodyMsg = {
        message: "Berhasil hapus histori",
      };
      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  },

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const customReq = req as CustomRequest;

      const histories: ResponseHistory[] = await UsersCol.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(customReq._id),
          },
        },
        {
          $unwind: "$history",
        },
        {
          $project: {
            _id: 0,
            email: 0,
            password: 0,
            created_at: 0,
          },
        },
      ]);

      const r: ResponseBodyData<ResponseHistory[]> = {
        message: "Semua data history",
        data: histories,
      };

      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  },
};

export default userControl;
