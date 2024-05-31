import { Request, Response, NextFunction } from "express";
import axios from "axios";

const animeControl = {
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${req.params.src}&limit=1`
      );

      res.status(200).json(data.data.data);
    } catch (err) {
      next(err);
    }
  },
};

export default animeControl;
