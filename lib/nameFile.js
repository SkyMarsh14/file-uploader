import query from "../db/query.js";
async function nameFile(fileName, folderId, count = 0) {
  const extension = fileName.match(/\.[0-9a-z]+$/);
  const baseName = fileName.replace(extension, "");
  const file = await query.file.findUnique({
    fileName: baseName + count + extension,
    folderId: folderId,
  });
  if (file) {
    count++;
    return nameFile(fileName, folderId, count);
  }
  fileName = baseName + count + extension;
  return fileName;
}

export default nameFile;
