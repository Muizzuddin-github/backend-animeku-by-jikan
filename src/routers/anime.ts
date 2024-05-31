import express from "express";
import animeControl from "../controllers/anime";

const anime: express.Router = express.Router();

anime.get("/api/anime/search/:src", animeControl.search);

export default anime;
