import { body, validationResult } from "express-validator";
import query from "./../db/query.js";
const validateFolderName = [
  body("folderName").trim().notEmpty().withMessage("Folder name is required."),
];
const uploadController = {
  get_folder: async (req, res) => {
    let data;
    if (req.params.folderId === req.user.id) {
      data = await query.folder.getFolderByParentId(req.user.id);
    } else {
      data = await query.folder.getFolderByParentId(
        req.user.id,
        req.params.folderId
      );
    }

    res.render("home", {
      page: "upload",
      user: req.user,
      folders: data.folders,
      files: data.files || null,
      folderId: data.parentId,
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
