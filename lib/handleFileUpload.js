import multer from "multer";
import query from "../db/query.js";
import nameFile from "../lib/nameFile.js";
import path from "node:path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILE_PATH);
  },
  filename: async (req, file, cb) => {
    const folderId = req.params.folderId;
    const fileName = await nameFile(file.originalname, folderId);
    const userFile = await query.file.create(fileName, folderId);
    cb(null, userFile.id + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

export default upload;
