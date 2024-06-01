import { Request, Response, NextFunction } from "express";
import ResponseErr from "../utility/responseErr";
import verifyToken, { VerifyToken } from "../utility/verifyToken";
import { UserColEntity } from "../entity/users";
import UsersCol from "../models/users";
import { CustomRequest } from "../types/expressCustom";
import isObjectID from "../utility/isObjectID";

const onlyLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const token = req.signedCookies.token;

    if (!token) {
      throw new ResponseErr(403, "Silahkan login terlebih dahulu");
    }

    if (!process.env.SECRET_TOKEN) {
      throw new ResponseErr(500, "Secret invalid");
    }

    const decode: VerifyToken = await verifyToken<VerifyToken>(
      token,
      process.env.SECRET_TOKEN
    );

    if (!isObjectID(decode._id)) {
      throw new ResponseErr(403, "Silahkan login terlebih dahulu");
    }

    const checkUser: UserColEntity | null = await UsersCol.findById(decode._id);

    if (!checkUser) {
      throw new ResponseErr(403, "Silahkan login terlebih dahulu");
    }

    customReq._id = decode._id;

    next();
  } catch (err) {
    next(err);
  }
};

export default onlyLogin;
