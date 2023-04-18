var form = document.getElementById("form");
var inpName = document.getElementById("name");
var inpSurname = document.getElementById("surname");
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
    displayData.insertAdjacentHTML("beforeend", "\n        <div class=\"displayRowHeadings\">\n        <p>Name</p>\n        <p>Surname</p>\n        <p>Phone</p>\n        <p>Email</p>\n        <p>Application Date</p>\n        <p>Choice</p>\n        <p>Start Date</p>\n        <p>Current Status</p>\n        <p>Bank</p>\n        <p>Sum</p>\n        <p>Rate Expander100 %</p>\n        <p>Firm Income</p>\n        <p>My Payment</p>\n        <p>My Notes</p>\n        <p>Summary Acti.</p>\n        </div>");
    for (var i = 0; i < getStorage.length; i++) {
        displayData.insertAdjacentHTML("afterend", "\n        <div class=\"displayRow\">\n        <p>".concat(getStorage[i].Name, "</p>            \n        <p>").concat(getStorage[i].Surname, "</p>            \n        <p>").concat(getStorage[i].Phone, "</p>            \n        <p>").concat(getStorage[i].Email, "</p>            \n        <p>").concat(getStorage[i].AppDate, "</p>            \n        <p>").concat(getStorage[i].Choice, "</p>            \n        <p>").concat(getStorage[i].StartDate, "</p>            \n        <p>").concat(getStorage[i].CurrStatus, "</p>            \n        <p>").concat(getStorage[i].Bank, "</p>            \n        <p>").concat(getStorage[i].Sum, "</p>            \n        <p>").concat(getStorage[i].FirmIncome, "</p>            \n        <p>").concat(getStorage[i].MyNotes, "</p>            \n        <p>").concat(getStorage[i].SummaryActi, "</p>\n        </div>\n        "));
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
