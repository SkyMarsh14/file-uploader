import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./config/passport.js";
import path from "node:path";
import loginRouter from "./routes/loginRouter.js";
import session from "express-session";
import passport from "passport";
const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

app.use("/", loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express app listening to PORT: ${PORT}`);
});
