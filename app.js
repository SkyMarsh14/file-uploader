import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import path from "node:path";
import loginRouter from "./routes/loginRouter.js";

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express app listening to PORT: ${PORT}`);
});
