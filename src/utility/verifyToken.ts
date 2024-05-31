import jwt, { JwtPayload } from "jsonwebtoken";
import ResponseErr from "./responseErr";

export interface VerifyTokenOtp {
  username: string;
  email: string;
  password: string;
}

type VerifyTokenAllow = VerifyTokenOtp | JwtPayload;

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

      resolve(decoded as T);
    });
  });
}

export default verifyToken;
