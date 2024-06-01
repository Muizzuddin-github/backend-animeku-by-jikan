import jwt from "jsonwebtoken";
import ResponseErr from "./responseErr";

export interface VerifyTokenOtp {
  username: string;
  email: string;
  password: string;
}

export interface VerifyToken {
  _id: string;
}

type VerifyTokenAllow = VerifyTokenOtp | VerifyToken;

function verifyToken<T extends VerifyTokenAllow>(
  token: string,
  secret: string
): Promise<T> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(new ResponseErr(400, "Token sudah kadaluarsa"));
        return;
      }

      if (!decoded) {
        reject(new ResponseErr(400, "Invalid token"));
        return;
      }

      if (typeof decoded === "object") {
        if (
          "_id" in decoded ||
          ("username" in decoded && "email" in decoded && "password" in decoded)
        ) {
          resolve(decoded as T);
        } else {
          reject(new ResponseErr(400, "Token tidak valid"));
        }
      } else {
        reject(new ResponseErr(400, "Token tidak valid"));
      }
    });
  });
}

export default verifyToken;
