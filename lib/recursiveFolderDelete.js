import query from "../db/query.js";

const recursiveFolderDelete = async (folderId) => {
  const folder = await query.folder.delete(folderId);
  const condition = { parentFolderId: folder.id };
  const children = await query.folder.findMany(condition);
  if (children) {
    children.forEach((folder) => {
      recursiveFolderDelete(folder.id);
    });
  }
  return;
};

export default recursiveFolderDelete;
