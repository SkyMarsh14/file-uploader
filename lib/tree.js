import query from "../db/query.js";

const getTree = async (currentFolder) => {
  //Get tree will return an array with objects of folder id and folder name
  //in the order of the deapth of the folder
  let tree = [];
  while (currentFolder) {
    const folder = await query.folder.getParent(currentFolder);
    if (!folder) {
      return tree;
    }
    tree.unshift(folder);
    currentFolder = folder.id;
  }
};
export default getTree;
