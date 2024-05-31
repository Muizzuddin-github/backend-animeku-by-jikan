import express from "express";
import historyControl from "../controllers/history";

const history: express.Router = express.Router();

history.post("/api/anime/history", historyControl.add);
history.get("/api/anime/history", historyControl.getAll);
history.delete("/api/anime/history/:id", historyControl.del);

export default history;
