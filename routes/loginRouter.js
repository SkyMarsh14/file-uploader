import { Router } from "express";
import loginController from "./../controllers/loginController.js";
const loginRouter = Router();

loginRouter.get("/sign-in", loginController.sign_in_get);
loginRouter.post("/sign-in", loginController.sign_in_post);
loginRouter.get("/sign-up", loginController.sign_up_get);
loginRouter.post("/sign-up", loginController.sign_up_post);
export default loginRouter;
