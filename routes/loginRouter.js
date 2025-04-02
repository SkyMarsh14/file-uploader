const { Router } = require("express");
const loginController = require("./../controllers/loginController");
const loginRouter = Router();

loginRouter.get("/sign-in", loginController.sign_in_get);
loginRouter.get("/sign-up", loginController.sign_up_get);

module.exports = loginRouter;
