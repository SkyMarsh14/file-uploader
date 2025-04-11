import { Router } from "express";
import uploadController from "../controllers/uploadController.js";
import multer from "multer";
import isAuth from "../lib/isAuth.js";
import query from "../db/query.js";
import nameFile from "../lib/nameFile.js";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILE_PATH);
  },
  filename: async (req, file, cb) => {
    const folderId = req.params.folderId;
    const fileName = await nameFile(file.originalname, folderId);
    const userFile = await query.file.create(fileName, folderId);
    cb(null, userFile.id);
  },
});

const upload = multer({ storage: storage });
const uploadRouter = Router();
uploadRouter.use(isAuth);
uploadRouter.get("/:folderId", uploadController.get_folder);
uploadRouter.post("/", upload.single("userFile"), uploadController.post_file);
uploadRouter.post("/folder/:folderId/create", uploadController.create_folder);
uploadRouter.post("/folder/:folderId/rename", uploadController.rename_folder);
uploadRouter.post("/folder/:folderId/delete", uploadController.delete_folder);
uploadRouter.use("*params", (req, res) => {
  res.redirect(`/upload/${req.user.id}`);
});
export default uploadRouter;
