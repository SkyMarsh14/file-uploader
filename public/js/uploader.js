const newFileBtn = document.querySelector(".newFileBtn");
const fileDialog = document.querySelector("#file-dialog");
newFileBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fileDialog.showModal();
});
const newFolderBtn = document.querySelector(".newFolderBtn");
const folderDialog = document.querySelector("#folder-dialog");
newFolderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  folderDialog.showModal();
});
const closeModalBtns = document.querySelectorAll(".close-modal");
closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.closest("dialog").close();
  });
});
const dropdownToggleBtns = document.querySelectorAll(".folder-dropdown-btn");
dropdownToggleBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const li = btn.closest(".folder-list");
    li.querySelector(".edit-dropdown-container").classList.toggle("visible");
    li.querySelector(".folder-link").classList.toggle("selected-folder");
  });
});
const renameModal = document.querySelector(".folder-rename");
const renameBtns = document.querySelectorAll(".folder-rename-btn");
renameBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    renameModal.showModal();
    const a = btn.closest("li.folder-list").querySelector(".folder-name");

    document.querySelector("#rename-input").value = a.textContent;
    const folderId = btn.closest("li.folder-list").dataset.folderId;
    document.querySelector(".rename-form").action =
      "/upload/folder/" + folderId + "/rename";
  });
});
const deleteBtns = document.querySelectorAll(".folder-delete-btn");
deleteBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".folder-delete").showModal();
    const folderId = btn.closest("li.folder-list").dataset.folderId;
    document.querySelector(".delete-form").action =
      "/upload/folder/" + folderId + "/delete";
  });
});
const fileList = document.querySelectorAll(".file-list");
fileList.forEach((li) => {
  li.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = `/upload/file/${li.dataset.fileId}/details`;
  });
});
function removeClassFromAll(nodes, className) {
  nodes.forEach((node) => {
    node.classList.remove(className);
  });
}
function hideDiv() {
  removeClassFromAll(
    document.querySelectorAll(".folder-link"),
    "selected-folder"
  );
  removeClassFromAll(
    document.querySelectorAll(".edit-dropdown-container"),
    "visible"
  );
}
function hideDivOnMouseup(e) {
  const folderBtns = document.querySelectorAll(".folder-dropdown-btn");
  const condition = Array.from(folderBtns).some((btn) => {
    return e.target.isSameNode(btn);
  });
  if (condition) return null;
  return document.contains(e.target) ? hideDiv() : null;
}
function hideDivOnEsc(e) {
  return e.key === "Escape" ? hideDiv() : null;
}
document.addEventListener("mouseup", hideDivOnMouseup);
document.addEventListener("keydown", hideDivOnEsc);
