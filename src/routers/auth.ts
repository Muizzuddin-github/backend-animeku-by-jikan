import express from "express";
import authControl from "../controllers/auth";

const auth: express.Router = express.Router();

auth.post("/api/user/register", authControl.register);
auth.post("/api/user/register-save", authControl.registerSave);
auth.post("/api/user/login", authControl.login);
auth.post("/api/user/logout", authControl.logout);

export default auth;
