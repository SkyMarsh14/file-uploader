import { body, validationResult } from "express-validator";
import query from "./../db/query.js";
import getTree from "../lib/tree.js";
const validateFolderName = [
  body("folderName").trim().notEmpty().withMessage("Folder name is required."),
];
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
    await query.res.send("Successfully uploaded.");
  },
  post_folder: [
    validateFolderName,

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .render("home", { page: "upload", errors: errors });
      }
      const folderName = req.body.folderName;
      const folder = await query.folder.create(folderName, req.params.folderId);
      res.redirect(`/upload/${folder.parentFolderId}`);
    },
  ],
};
export default uploadController;
