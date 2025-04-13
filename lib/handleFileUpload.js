import multer from "multer";
import query from "../db/query.js";
import nameFile from "../lib/nameFile.js";
import path from "node:path";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("userFile");

export default upload;
