import express from "express";
import anime from "./routers/anime";
import errorHandling from "./middlewares/errorHandling";
import auth from "./routers/auth";
import user from "./routers/user";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: express.Application = express();
app.use(
  cors({
    origin: ["https://animeku-two.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser("secret"));
app.use(express.json());

app.get("/", function (req, res) {
  res.send("okeh");
});

app.use(auth);
app.use(anime);
app.use(user);
app.use(errorHandling);

export default app;
