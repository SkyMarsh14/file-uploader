import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./config/passport.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import loginRouter from "./routes/loginRouter.js";
import indexRouter from "./routes/indexRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import session from "express-session";
import passport from "passport";
import connection from "connect-pg-simple";
import pool from "./db/pool.js";
const pgSession = connection(session);
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 60 * 24 * 1000,
    },
  })
);
app.use(passport.session());

app.use("/", loginRouter);
app.use("/", indexRouter);
app.use("/upload", uploadRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express app listening to PORT: ${PORT}`);
});
