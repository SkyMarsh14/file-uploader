import { Router } from "express";
import uploadController from "../controllers/uploadController.js";
import multer from "multer";
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
uploadRouter.post("/", upload.single("userFile"), uploadController.post_file);
uploadRouter.post("/folder", uploadController.post_folder);
export default uploadRouter;
