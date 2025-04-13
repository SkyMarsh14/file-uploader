import DatauriParser from "datauri/parser.js";
import { format } from "date-fns";
import path from "node:path";
import cloudinaryUpload from "../config/cloudinary.js";
import formatFileSize from "../lib/formatFileSize.js";
import { validateFolderName, validateForm } from "../lib/formValidation.js";
import nameFile from "../lib/nameFile.js";
import recursiveFolderDelete from "../lib/recursiveFolderDelete.js";
import getTree from "../lib/tree.js";
import query from "./../db/query.js";
const parser = new DatauriParser();
const uploadController = {
  get_folder: async (req, res) => {
    const folderId = req.params.folderId;
    const folder = await query.folder.getFolderById(folderId);
    if (!folder) {
      res.redirect("/");
    }
    const data = await query.folder.getFolderByParentId(folderId);
    const tree = await getTree(folderId);
    res.render("home", {
      page: "upload",
      user: req.user,
      folders: data.folders,
      files: data.files || null,
      folderId: data.parentFolderId,
      tree: tree,
    });
  },
  post_file: async (req, res) => {
    const folderId = req.params.folderId;
    const extension = path.extname(req.file.originalname).toString();
    const file = parser.format(extension, req.file.buffer);
    const response = await cloudinaryUpload(file.content);
    const filename = await nameFile(req.file.originalname, folderId);
    const upload = await query.file.upload(
      filename,
      req.file.size,
      response.url,
      file.mimetype,
      folderId
    );
    res.redirect(`/upload/${folderId}`);
  },
  create_folder: [
    validateFolderName,
    validateForm,
    async (req, res) => {
      const folderName = req.body.folderName;
      const folder = await query.folder.create(folderName, req.params.folderId);
      res.redirect(`/upload/${folder.parentFolderId}`);
    },
  ],
  rename_folder: [
    validateFolderName,
    validateForm,
    async (req, res) => {
      const folderId = req.params.folderId;
      const parentId = (await query.folder.getFolderById(folderId))
        .parentFolderId;
      await query.folder.rename(folderId, req.body.folderName);
      res.redirect(`/upload/${parentId}`);
    },
  ],
  delete_folder: async (req, res) => {
    const folderId = req.params.folderId;
    const folder = await query.folder.getFolderById(folderId);
    let url;
    if (folder.parentFolderId === null) {
      url = req.user.userId;
    } else {
      url = folder.parentFolderId;
    }
    const deleted = await recursiveFolderDelete(folderId);
    res.redirect(`/upload/${url}`);
  },
  file_details: async (req, res) => {
    const file = await query.file.findUnique({ id: req.params.fileId });
    const tree = await getTree(file.folderId);
    file.size = formatFileSize(file.size);
    const createdDay = format(file.created_at, "MMMMMMMMM dd, yyyy");
    const createdTime = format(file.created_at, "p");
    //Format like Thursday, April 10, 2025 at 1700
    file.created_at = createdDay + " at " + createdTime;
    res.render("home", {
      file,
      page: "fileDetails",
      folderId: file.folderId,
      tree,
      user: req.user,
    });
  },
};
export default uploadController;
