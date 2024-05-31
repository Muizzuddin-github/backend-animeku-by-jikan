import { Request, Response, NextFunction } from "express";
import { HistoryReqBody } from "../requestBody/history";
import HistoryValidation from "../validation/history";
import HistoryCol from "../models/history";
import { ResponseBodyData, ResponseBodyMsg } from "../responseBody/response";
import { HistoryEntity } from "../entity/history";
import isObjectID from "../utility/isObjectID";
import ResponseErr from "../utility/responseErr";

const historyControl = {
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const val: HistoryReqBody = await HistoryValidation.add(req.body);

      const insert = new HistoryCol(val);
      await insert.save();

      const r: ResponseBodyMsg = {
        message: "Insert history anime successfully",
      };
      res.status(201).json(r);
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data: HistoryEntity[] = await HistoryCol.find();
      const r: ResponseBodyData<HistoryEntity[]> = {
        message: "All data history",
        data: data,
      };
      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  },

  async del(req: Request, res: Response, next: NextFunction) {
    try {
      if (!isObjectID(req.params.id)) {
        throw new ResponseErr(400, "ID Invalid");
      }

      await HistoryCol.deleteOne({ _id: req.params.id });

      const r: ResponseBodyMsg = {
        message: "Delete history successfully",
      };
      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  },
};

export default historyControl;
