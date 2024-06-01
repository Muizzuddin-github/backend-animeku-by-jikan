import { Request, Response, NextFunction } from "express";

const userControl = {
  async addHistory(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).send("oke");
    } catch (err) {
      next(err);
    }
  },
};

export default userControl;
