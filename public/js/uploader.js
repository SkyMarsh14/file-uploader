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
  });
});
