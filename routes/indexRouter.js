import { Router } from "express";
import indexController from "../controllers/indexController.js";
import isAuth from "../lib/isAuth.js";
const indexRouter = Router();
indexRouter.get("/", isAuth, indexController.get_main);
export default indexRouter;
