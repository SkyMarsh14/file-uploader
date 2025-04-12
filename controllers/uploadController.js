import query from "./../db/query.js";
import getTree from "../lib/tree.js";
import recursiveFolderDelete from "../lib/recursiveFolderDelete.js";
import { validateFolderName, validateForm } from "../lib/formValidation.js";
import path, { format } from "node:path";
import formatFileSize from "../lib/formatFileSize.js";
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
    const extension = path.extname(req.file.filename);
    const filename = req.file.filename.replace(extension, "");
    const data = {
      size: req.file.size,
      extension: extension.slice(1),
    };
    const update = await query.file.update_by_id(filename, data);
    res.redirect(`/upload/${req.params.folderId}`);
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

    file.size = formatFileSize(file.size);
    res.render("home", { file, page: "fileDetails" });
  },
};
export default uploadController;
