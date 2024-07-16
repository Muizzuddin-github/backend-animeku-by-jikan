import { Request, Response, NextFunction } from "express";
import { Register, RegisterSave, RequestBodyLogin } from "../requestBody/auth";
import { Email, EmailConfig } from "../utility/sendEmail";
import AuthValidation from "../validation/Auth";
import { ResponseRegisterEmail } from "../responseBody/register";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import otpGenerator from "../utility/OtpGenreator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ResponseErr from "../utility/responseErr";
import OtpCodeCol from "../models/otpCode";
import { RequestBodyIsLogin, ResponseBodyMsg } from "../responseBody/response";
import UsersCol from "../models/users";
import { OtpCodeEntity } from "../entity/otpCode";
import verifyToken, {
  VerifyTokenOtp,
  VerifyToken,
} from "../utility/verifyToken";
import { UserColEntity } from "../entity/users";
import isObjectID from "../utility/isObjectID";
import { CustomRequest } from "../types/expressCustom";
const authControl = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body: Register = req.body;
      await AuthValidation.register(body);

      const checkUser = await UsersCol.findOne({ email: body.email });
      if (checkUser) {
        throw new ResponseErr(400, "Email sudah ada");
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(body.password, salt);
      body.password = hashPassword;

      if (!process.env.SECRET_OTP) {
        throw new ResponseErr(500, "Secret Otp Invalid");
      }

      const otp: string = otpGenerator();
      const otpToken = jwt.sign(
        {
          username: body.username,
          email: body.email,
          password: body.password,
        },
        process.env.SECRET_OTP,
        {
          expiresIn: "10m",
        }
      );

      const config: EmailConfig = {
        from: "History Anime",
        to: body.email,
        subject: "OTP Code",
        html: `<b>code otp berlaku 10 menit 
        </b>
        <p>code otp anda : ${otp}</p>`,
      };
      const email = new Email(config);
      const info: SMTPTransport.SentMessageInfo = await email.send();

      const saveOtpCode = new OtpCodeCol({
        otp: otp,
        otpToken: otpToken,
      });

      await saveOtpCode.save();

      const r: ResponseRegisterEmail = {
        message: "Silahkan periksa email anda",
        messageId: info.messageId,
      };

      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  },

  async registerSave(req: Request, res: Response, next: NextFunction) {
    try {
      const body: RegisterSave = req.body;
      await AuthValidation.registerSave(body);

      const otpDb: OtpCodeEntity | null = await OtpCodeCol.findOne({
        otp: body.otp,
      });

      if (!otpDb) {
        throw new ResponseErr(404, "Code otp anda tidak valid");
      }

      if (otpDb.otp !== body.otp) {
        throw new ResponseErr(400, "Periksa code otp anda");
      }

      if (!process.env.SECRET_OTP) {
        throw new ResponseErr(500, "Secret otp invalid");
      }
      const decoded: VerifyTokenOtp = await verifyToken<VerifyTokenOtp>(
        otpDb.otpToken,
        process.env.SECRET_OTP
      );

      const checkUser = await UsersCol.findOne({ email: decoded.email });
      if (checkUser) {
        throw new ResponseErr(400, "Code otp anda tidak valid");
      }

      const userSave = new UsersCol({
        username: decoded.username,
        email: decoded.email,
        password: decoded.password,
      });

      await userSave.save();

      await OtpCodeCol.deleteOne({
        otp: body.otp,
      });

      const r: ResponseBodyMsg = {
        message: "Registrasi berhasil",
      };
      res.status(201).json(r);
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body: RequestBodyLogin = req.body;
      await AuthValidation.login(body);

      const checkUser: UserColEntity | null = await UsersCol.findOne({
        email: body.email,
      });

      if (!checkUser) {
        throw new ResponseErr(404, "Periksa email atau assword anda");
      }

      const checkPassword: boolean = await bcrypt.compare(
        body.password,
        checkUser.password
      );

      if (!checkPassword) {
        throw new ResponseErr(404, "Periksa email atau assword anda");
      }

      if (!process.env.SECRET_TOKEN) {
        throw new ResponseErr(500, "Secret token invalid");
      }

      const token = jwt.sign(
        {
          _id: checkUser._id.toString(),
        },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 86400 * 1000,
        priority: "high",
        secure: true,
        signed: true,
      });

      const r: ResponseBodyMsg = {
        message: "Berhasil login",
      };

      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  },
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        maxAge: 0,
        priority: "high",
        secure: true,
        signed: true,
      });

      const r: ResponseBodyMsg = {
        message: "Berhasil logout",
      };
      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  },

  async isLogin(req: Request, res: Response, next: NextFunction) {
    try {
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

      const checkUser: UserColEntity | null = await UsersCol.findById(
        decode._id
      );

      if (!checkUser) {
        throw new ResponseErr(403, "Silahkan login terlebih dahulu");
      }

      const r: RequestBodyIsLogin = {
        message: "User is logined",
        username: checkUser.username,
      };

      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  },
};

export default authControl;
