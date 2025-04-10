import query from "./../db/query.js";
import getTree from "../lib/tree.js";
import recursiveFolderDelete from "../lib/recursiveFolderDelete.js";
import { validateFolderName, validateForm } from "../lib/formValidation.js";
const uploadController = {
  get_folder: async (req, res) => {
    const userId = req.user.id;
    const folderId = req.params.folderId;
    let data;
    let tree;
    if (folderId === userId) {
      data = await query.folder.getFolderByParentId(userId);
    } else {
      data = await query.folder.getFolderByParentId(userId, folderId);
      tree = await getTree(folderId);
    }
    res.render("home", {
      page: "upload",
      user: req.user,
      folders: data.folders,
      files: data.files || null,
      folderId: data.parentId,
      tree: tree,
    });
  },
  post_file: async (req, res) => {
    await query.file.create(req.file.originalUrl, req.params.folderId);
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
};
export default uploadController;
