import { body, validationResult } from "express-validator";
import query from "../db/query.js";
const validateFolderName = [
  body("folderName")
    .trim()
    .notEmpty()
    .withMessage("Folder name is required.")
    .custom(async (folderName, { req }) => {
      try {
        const folderId = req.params.folderId;

        const folder = await query.folder.find({
          parentFolderId: folderId,
          folderName: folderName,
        });
        console.log(folder);
        if (folder) {
          throw new Error("This folder name already in use in this folder.");
        }
        return true;
      } catch (err) {
        throw new Error(err.message || "Error validating foldername");
      }
    }),
];
const validateForm = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("home", {
      page: "upload",
      errors: errors.array(),
      folderId: req.params.folderId,
      user: req.user,
    });
  }
  return next();
};

export { validateFolderName, validateForm };
