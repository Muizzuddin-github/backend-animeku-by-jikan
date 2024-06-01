import express from "express";
import userControl from "../controllers/user";
import onlyLogin from "../middlewares/onlyLogin";

const users: express.Router = express.Router();

users.get("/api/user/history", onlyLogin, userControl.getHistory);
users.post("/api/user/history", onlyLogin, userControl.addHistory);
users.delete("/api/user/history/:id", onlyLogin, userControl.delHistory);

export default users;
