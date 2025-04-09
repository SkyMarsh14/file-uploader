import { Router } from "express";
import uploadController from "../controllers/uploadController.js";
import multer from "multer";
import isAuth from "../lib/isAuth.js";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const uploadRouter = Router();
uploadRouter.use(isAuth);
uploadRouter.get("/:folderId", uploadController.get_folder);
uploadRouter.post("/", upload.single("userFile"), uploadController.post_file);
uploadRouter.post(
  "/folder/:folderId/create",
  uploadController.validateForm,
  uploadController.create_folder
);
uploadRouter.post(
  "/folder/:folderId/rename",
  uploadController.validateForm,
  uploadController.rename_folder
);
uploadRouter.post("/folder/:folderId/delete", uploadController.delete_folder);
export default uploadRouter;
