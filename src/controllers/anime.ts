import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { ResponseJikan, SearchJikan } from "../responseBody/jikan";

const animeControl = {
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${req.params.src}&limit=16`
      );

      const jikanRes: SearchJikan[] = data.data.data;

      const r: ResponseJikan = {
        message: "Data yang dicari",
        data: jikanRes,
      };
      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  },
};

export default animeControl;
