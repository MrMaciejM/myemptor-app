var form = document.getElementById("form");
var inpName = document.getElementById("name");
var inpSurname = document.getElementById("surname");
var inputFields = document.querySelectorAll("input, select");
var deleteAllBtn = document.getElementById("deleteAllBtn");
var deleteBtnYes = document.getElementById("deleteBtnYes");
var deleteBtnNo = document.getElementById("deleteBtnNo");
var clearFieldsBtn = document.getElementById("clearBtn");
var deleteModal = document.getElementById("deleteModal");
var modalCloseBtn = document.getElementById("modalCloseBtn");
var displayData = document.getElementById("displayDataSection");
// 1. Create LocalStorage if none exist for the app
var getStorage = JSON.parse(localStorage.getItem("myEmptor"));
if (!getStorage) {
    localStorage.setItem("myEmptor", JSON.stringify([]));
}
// 2. Display saved information 
function displayClientData() {
    var displayRows = document.querySelectorAll(".displayRow");
    displayRows.forEach(function (row) { return row.remove(); });
    getStorage.map(function (item) {
        displayData.insertAdjacentHTML("beforeend", "\n            <div class=\"displayRow\">\n            <p>".concat(item.Name, "</p>            \n            <p>").concat(item.Surname, "</p>            \n            <p>").concat(item.Phone, "</p>            \n            <p>").concat(item.Email, "</p>            \n            <p>").concat(item.AppDate, "</p>            \n            <p>").concat(item.Choice, "</p>            \n            <p>").concat(item.StartDate, "</p>            \n            <p>").concat(item.CurrStatus, "</p>            \n            <p>").concat(item.Bank, "</p>            \n            <p>").concat(item.Sum, "</p>            \n            <p>").concat(item.RateExp, "</p>            \n            <p>").concat(item.FirmIncome, "</p>            \n            <p>").concat(item.MyPayment, "</p>            \n            <p>").concat(item.MyNotes, "</p>            \n            <p>").concat(item.SummaryActi, "</p>\n            </div>\n        "));
    });
}
displayClientData();
// APP LOGIC
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
    e.preventDefault();
    var array = getStorage;
    // prettier-ignore
    var fieldNames = ["Name", "Surname", "Phone", "Email", "AppDate", "Choice", "StartDate", "CurrStatus", "Bank", "Sum", "RateExp", "FirmIncome", "MyPayment", "MyNotes", "SummaryActi"];
    var clientData = {};
    for (var i = 0; i < 15; i++) {
        var userInputs = inputFields[i];
        //console.log(fieldNames[i], userInputs.value);
        clientData[fieldNames[i]] = userInputs.value;
    }
    array.push(clientData);
    localStorage.setItem("myEmptor", JSON.stringify(array));
    displayClientData();
});
function hideModal() {
    deleteModal.classList.add("hide");
}
// 3. DELETE ALL FUNCTIONALITY
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
    location.reload();
});
// Select "No" option
deleteBtnNo.addEventListener("click", function (e) {
    hideModal();
});
// 4. CLEAR FIELDS FUNCTIONALITY
clearFieldsBtn.addEventListener("click", function (e) {
    inputFields.forEach(function (field) {
        field.value = "";
    });
});
// TEST FETCH CALL 
// ADD "f" to beginning of API key to make it work
// I disabled it so I don't run out of calls for the demo
var apiKey = "277792558525d895e036ffce5c0fef3";
// fetch(`http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=AAPL&limit=1`)
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));
// NOTE: most likely will scratch the fetch stock idea because of relevancy, though it is still TBC. 
