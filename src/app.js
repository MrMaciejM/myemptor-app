// FORM variables
var form = document.getElementById("form");
var inpName = document.getElementById("name");
var inpSurname = document.getElementById("surname");
var inputFields = document.querySelectorAll("input, select");
// BUTTONS
var deleteAllBtn = document.getElementById("deleteAllBtn");
var deleteBtnYes = document.getElementById("deleteBtnYes");
var deleteBtnNo = document.getElementById("deleteBtnNo");
var clearFieldsBtn = document.getElementById("clearBtn");
// MODAL
var deleteModal = document.getElementById("deleteModal");
var modalCloseBtn = document.getElementById("modalCloseBtn");
// DATA RENDERING
var displayData = document.getElementById("displayDataSection");
var displayRows = document.querySelectorAll(".displayRow");
// SORTING OPTIONS
var sortOptions = document.getElementById("sortOptions");
// 1. Create LocalStorage if none exist for the app
var getStorage = JSON.parse(localStorage.getItem("myEmptor"));
if (!getStorage) {
    localStorage.setItem("myEmptor", JSON.stringify([]));
}
// 2. Display saved information 
function displayClientData() {
    var storageData = JSON.parse(localStorage.getItem("myEmptor")) || [];
    displayData.innerHTML = "";
    storageData.forEach(function (item) {
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
// 5. SORTING FUNCTIONALITY 
sortOptions.addEventListener("click", function (e) {
    var selectedOption = e.target.value;
    //console.log("sort by name is: " + selectedOption);
    // localStorage data which will be used for the filter
    var dataArray = getStorage.map(function (item) {
        return {
            Name: item.Name,
            Surname: item.Surname,
            Phone: item.Phone,
            Email: item.Email,
            AppDate: item.AppDate,
            Choice: item.Choice,
            StartDate: item.StartDate,
            CurrStatus: item.CurrStatus,
            Bank: item.Bank,
            Sum: item.Sum,
            RateExp: item.RateExp,
            FirmIncome: item.FirmIncome,
            MyPayment: item.MyPayment,
            MyNotes: item.MyNotes,
            SummaryActi: item.SummaryActi
        };
    });
    // sorting logic 
    switch (selectedOption) {
        case "name-AZ":
            dataArray.sort(function (a, b) { return a.Name.localeCompare(b.Name); });
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "name-ZA":
            //displayRows.forEach(row => row.remove());
            dataArray.sort(function (a, b) { return b.Name.localeCompare(a.Name); });
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "surname-AZ":
            dataArray.sort(function (a, b) { return a.Surname.localeCompare(b.Surname); });
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "surname-ZA":
            dataArray.sort(function (a, b) { return b.Surname.localeCompare(a.Surname); });
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "applicationDateNew":
            dataArray.sort(function (a, b) { return Date.parse(b.AppDate) - Date.parse(a.AppDate); });
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "applicationDateOld":
            dataArray.sort(function (a, b) { return Date.parse(a.AppDate) - Date.parse(b.AppDate); });
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "bank":
            dataArray.sort(function (a, b) { return b.Bank.localeCompare(a.Bank); });
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "sum":
            dataArray.sort(function (a, b) { return parseFloat(b.Sum) - parseFloat(a.Sum); });
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "firmIncomeLow":
            dataArray.sort(function (a, b) { return parseFloat(a.FirmIncome) - parseFloat(b.FirmIncome); });
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "firmIncomeHigh":
            dataArray.sort(function (a, b) { return parseFloat(b.FirmIncome) - parseFloat(a.FirmIncome); });
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "myPaymentLow":
            dataArray.sort(function (a, b) { return parseFloat(a.MyPayment) - parseFloat(b.MyPayment); });
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "myPaymentHigh":
            dataArray.sort(function (a, b) { return parseFloat(b.MyPayment) - parseFloat(a.MyPayment); });
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
    }
}); // end of sorting function 
// TEST FETCH CALL 
// ADD "f" to beginning of API key to make it work
// I disabled it so I don't run out of calls for the demo
var apiKey = "277792558525d895e036ffce5c0fef3";
// fetch(`http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=AAPL&limit=1`)
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));
// NOTE: most likely will scratch the fetch stock idea because of relevancy, though it is still TBC. 
