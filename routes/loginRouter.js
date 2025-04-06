import { Router } from "express";
import loginController from "./../controllers/loginController.js";
const loginRouter = Router();

loginRouter.get("/sign-in", loginController.sign_in_get);
loginRouter.post("/sign-in", loginController.sign_in_post);
loginRouter.get("/sign-up", loginController.sign_up_get);
loginRouter.post("/sign-up", loginController.sign_up_post);
loginRouter.get("/", (req, res) => {
  res.render("home", { user: req.user });
});
loginRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
export default loginRouter;
