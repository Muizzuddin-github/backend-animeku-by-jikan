import app from "./src/app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    if (!process.env.DATABASE_URI) {
      throw Error("Env Invalid");
    }
    await mongoose.connect(process.env.DATABASE_URI);

    app.listen(8080, function () {
      console.log("server is running");
    });
  } catch (err) {
    console.log(err);
  }
})();
