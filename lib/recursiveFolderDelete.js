import query from "../db/query.js`";

const recursiveFolderDelete = async (folderId) => {
  const currentFolder = await query.folder.delete(folderId);
};
