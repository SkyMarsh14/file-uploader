const { Router } = require("express");
const indexController = require("./../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/login", indexController.sign_in_get);

module.exports = indexRouter;
