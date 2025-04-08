import { body, validationResult } from "express-validator";
import query from "./../db/query.js";
const validateFolderName = [
  body("folderName").trim().notEmpty().withMessage("Folder name is required."),
];
const uploadController = {
  get_main: async (req, res) => {
    const folders = await query.folder.getBaseFolders(req.user.userId);
    res.render("home", {
      page: "upload",
      user: req.user,
      folders: folders,
    });
  },
  post_file: async (req, res) => {
    res.send("Successfully uploaded.");
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
      await query.folder.create(folderName);
      res.redirect("/upload");
    },
  ],
};
export default uploadController;
