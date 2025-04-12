import { Router } from "express";
import uploadController from "../controllers/uploadController.js";
import isAuth from "../lib/isAuth.js";
import handleFileUpload from "./../lib/handleFileUpload.js";

const uploadRouter = Router();
uploadRouter.use(isAuth);
uploadRouter.get("/:folderId", uploadController.get_folder);
uploadRouter.post(
  "/file/:folderId/create",
  handleFileUpload.single("userFile"),
  uploadController.post_file
);
uploadRouter.get("/file/:fildId/details", uploadController.file_details);
uploadRouter.post("/folder/:folderId/create", uploadController.create_folder);
uploadRouter.post("/folder/:folderId/rename", uploadController.rename_folder);
uploadRouter.post("/folder/:folderId/delete", uploadController.delete_folder);

export default uploadRouter;
