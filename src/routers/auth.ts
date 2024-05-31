import express from "express";
import authControl from "../controllers/auth";

const users: express.Router = express.Router();

users.post("/api/user/register", authControl.register);
users.post("/api/user/register-save", authControl.registerSave);

export default users;
