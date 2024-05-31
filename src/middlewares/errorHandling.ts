import { Response, Request, NextFunction } from "express";
import ResponseErr from "../utility/responseErr";
import Joi from "joi";
import { MongoError } from "mongodb";

const errorHandling = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseErr) {
    res.status(err.getStatusCode).json({ errors: [err.message] });
    return;
  } else if (err instanceof Joi.ValidationError) {
    res.status(400).json({ errors: err.message.split(".") });
    return;
  } else if (err instanceof MongoError && err.code === 11000) {
    res.status(400).json({ errors: [err.message] });
    return;
  }

  res.status(500).json({ erros: [err.message] });
  return;
};

export default errorHandling;
