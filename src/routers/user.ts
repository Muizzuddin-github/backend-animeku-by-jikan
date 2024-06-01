import express from "express";
import userControl from "../controllers/user";

const users: express.Router = express.Router();

users.post("/api/user/history", userControl.addHistory);

export default users;
