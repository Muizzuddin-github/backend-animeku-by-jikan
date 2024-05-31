import express from "express";
import anime from "./routers/anime";
import errorHandling from "./middlewares/errorHandling";
import history from "./routers/history";
import users from "./routers/auth";

const app: express.Application = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("okeh");
});

app.use(users);
app.use(anime);
app.use(history);
app.use(errorHandling);

export default app;
