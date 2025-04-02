const { Router } = require("express");
const indexController = require("./../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.sign_up_get);

module.exports = indexRouter;
