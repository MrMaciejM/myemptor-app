var form = document.getElementById("form");
var inpName = document.getElementById("name");
var inpSurname = document.getElementById("surname");
var deleteAllBtn = document.getElementById("deleteAllBtn");
var deleteBtnYes = document.getElementById("deleteBtnYes");
var deleteBtnNo = document.getElementById("deleteBtnNo");
var deleteModal = document.getElementById("deleteModal");
var modalCloseBtn = document.getElementById("modalCloseBtn");
var displayData = document.getElementById("displayDataSection");
// 1. Create LocalStorage if none exist for the app
var getStorage = JSON.parse(localStorage.getItem("myEmptor"));
if (!getStorage) {
    localStorage.setItem("myEmptor", JSON.stringify([]));
}
console.log("Storage");
console.log(getStorage);
// 2. Display saved information 
function displayClientData() {
    console.log(getStorage.length);
    for (var i = 0; i < getStorage.length; i++) {
        displayData.insertAdjacentHTML("afterend", "\n        <div class=\"displayRow\" id=\"displayRow\">\n        <p>".concat(getStorage[i].Name, "</p>            \n        <p>").concat(getStorage[i].Surname, "</p>            \n        <p>").concat(getStorage[i].Phone, "</p>            \n        <p>").concat(getStorage[i].Email, "</p>            \n        <p>").concat(getStorage[i].AppDate, "</p>            \n        <p>").concat(getStorage[i].Choice, "</p>            \n        <p>").concat(getStorage[i].StartDate, "</p>            \n        <p>").concat(getStorage[i].CurrStatus, "</p>            \n        <p>").concat(getStorage[i].Bank, "</p>            \n        <p>").concat(getStorage[i].Sum, "</p>            \n        <p>").concat(getStorage[i].RateExp, "</p>            \n        <p>").concat(getStorage[i].FirmIncome, "</p>            \n        <p>").concat(getStorage[i].MyPayment, "</p>            \n        <p>").concat(getStorage[i].MyNotes, "</p>            \n        <p>").concat(getStorage[i].SummaryActi, "</p>\n        </div>\n        "));
    }
}
displayClientData();
// APP LOGIC
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
    e.preventDefault();
    var array = getStorage;
    console.log(inpName.value);
    console.log(inpSurname.value);
    //get value and save to storage on submit
    array.push({ "Name": inpName.value, "Surname": inpSurname.value });
    console.log(array);
    // display the 
});
function hideModal() {
    deleteModal.classList.add("hide");
}
// DELETE ALL FUNCTIONALITY
// Bring up the modal on Delete All click
deleteAllBtn.addEventListener("click", function (e) {
    deleteModal.classList.remove("hide");
});
// Close Modal on clicking X
modalCloseBtn.addEventListener("click", function (e) {
    hideModal();
});
// Wipe ALL Data
deleteBtnYes.addEventListener("click", function (e) {
    localStorage.setItem("myEmptor", JSON.stringify([]));
    var displayRow = document.getElementById("displayRow");
    displayRow === null || displayRow === void 0 ? void 0 : displayRow.remove();
    hideModal();
});
// Select "No" option
deleteBtnNo.addEventListener("click", function (e) {
    hideModal();
});
