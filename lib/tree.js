import query from "../db/query.js";

const getTree = async (currentFolderId) => {
  //Get tree will return an array with objects of folder id and folder name
  //in the order of the deapth of the folder
  const currenFolder = await query.folder.getFolderById(currentFolderId);
  let tree = [currenFolder];
  while (currentFolderId) {
    const folder = await query.folder.getParent(currentFolderId);
    if (!folder) {
      return tree;
    }
    tree.unshift(folder);
    currentFolderId = folder.id;
  }
};
export default getTree;
