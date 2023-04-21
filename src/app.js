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
// 2. Display saved information/client data
function displayClientData() {
    var storageData = JSON.parse(localStorage.getItem("myEmptor")) || [];
    displayData.innerHTML = "";
    storageData.forEach(function (item) {
        displayData.insertAdjacentHTML("beforeend", "\n            <div class=\"displayRow\">\n            <p>".concat(item.Name, "</p>            \n            <p>").concat(item.Surname, "</p>            \n            <p>").concat(item.Phone, "</p>            \n            <p>").concat(item.Email, "</p>            \n            <p>").concat(item.AppDate, "</p>            \n            <p>").concat(item.Choice, "</p>            \n            <p>").concat(item.StartDate, "</p>            \n            <p>").concat(item.CurrStatus, "</p>            \n            <p>").concat(item.Bank, "</p>            \n            <p>").concat(item.Sum, "</p>            \n            <p>").concat(item.RateExp, "</p>            \n            <p>").concat(item.FirmIncome, "</p>            \n            <p>").concat(item.MyPayment, "</p>            \n            <p>").concat(item.MyNotes, "</p>            \n            <p>").concat(item.SummaryActi, "</p>\n            <button class=\"delClientBtn\" id=").concat(item.id, ">X</button>\n            </div>\n        "));
    });
}
displayClientData();
// Form Submission Logic
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
    e.preventDefault();
    var array = getStorage || [];
    // prettier-ignore
    var fieldNames = ["Name", "Surname", "Phone", "Email", "AppDate", "Choice", "StartDate", "CurrStatus", "Bank", "Sum", "RateExp", "FirmIncome", "MyPayment", "MyNotes", "SummaryActi", "id"];
    var clientData = {};
    // preparing data to be stored in key value pairs {"fieldNames[i]": "userInputs.value"} and pushing to localStorage
    if (inputFields !== null) {
        for (var i = 0; i < 16; i++) {
            var userInputs = inputFields[i];
            clientData[fieldNames[i]] = userInputs.value;
        }
    } // end of if
    // sets ID on each object - forgot to do it initially, so the ID is in the last place to avoid breaking storing and retreiving objects
    var counter = 0;
    if (getStorage !== null && getStorage.length !== null) {
        counter = getStorage.length;
    }
    clientData.id = counter;
    array.push(clientData);
    localStorage.setItem("myEmptor", JSON.stringify(array));
    displayClientData();
    location.reload();
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
// 6. REMOVE SINGLE CLIENT ON MOUSE CLICK
var deleteClientBtn = document.getElementsByClassName("delClientBtn");
for (var i = 0; i < deleteClientBtn.length; i++) {
    displayData.addEventListener("click", function (e) {
        console.log("clicked: ", e.target.getAttribute("id"));
        var getId = e.target.getAttribute("id");
        getId = parseInt(getId);
        //console.log("type of getId:" + typeof(getId));        
        var clientData = JSON.parse(localStorage.getItem("myEmptor"));
        var itemIndex = clientData.findIndex(function (index) { return index.id === getId; });
        if (itemIndex !== -1) {
            console.log("inside item index");
            clientData.splice(itemIndex, 1);
            localStorage.setItem("myEmptor", JSON.stringify(clientData));
            console.log(clientData);
            displayClientData();
        }
        displayClientData();
    });
}
;
// 7. BACKUP OF DATA AND SHOWING BACKUP TIME
var backupBtn = document.getElementById("backupBtn");
if (!localStorage.getItem("myEmptorTime")) {
    localStorage.setItem("myEmptorTime", JSON.stringify(""));
}
;
function showLastBackupTime() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthName = monthNames[currentDate.getMonth()];
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes().toString().padStart(2, "0");
    var formattedDate = "".concat(day, "-").concat(monthName, "-").concat(year, " ").concat(hours, ":").concat(minutes);
    console.log(formattedDate);
    return formattedDate;
}
var updateTime = document.getElementById("backupTimeParagraph");
var getTime = localStorage.getItem("myEmptorTime");
// sets the p tag with last backup time
updateTime === null || updateTime === void 0 ? void 0 : updateTime.textContent = "Last backup was on ".concat(getTime === null || getTime === void 0 ? void 0 : getTime.replaceAll('"', ""));
// update time on click, and take backup.
var getBackupData = localStorage.getItem("myEmptorBackup");
if (!getBackupData) {
    localStorage.setItem("myEmptorBackup", JSON.stringify([]));
}
backupBtn === null || backupBtn === void 0 ? void 0 : backupBtn.addEventListener("click", function (e) {
    localStorage.setItem("myEmptorTime", JSON.stringify(showLastBackupTime()));
    updateTime === null || updateTime === void 0 ? void 0 : updateTime.textContent = "Last backup was on ".concat(getTime === null || getTime === void 0 ? void 0 : getTime.replaceAll('"', ""));
    var backupBtnDiv = document.getElementById("backupBtnDiv");
    localStorage.setItem("myEmptorBackup", JSON.stringify(getStorage));
    location.reload();
});
showLastBackupTime();
// 8. RESTORE FROM BACKUP
var restoreBtn = document.getElementById("restoreBtn");
restoreBtn === null || restoreBtn === void 0 ? void 0 : restoreBtn.addEventListener("click", function (e) {
    console.log("clicked");
    var emptorBackup = JSON.parse(localStorage.getItem("myEmptorBackup"));
    localStorage.setItem("myEmptor", JSON.stringify(emptorBackup));
    displayClientData();
    console.log(emptorBackup);
});
// TEST FETCH CALL 
// ADD "f" to beginning of API key to make it work
// I disabled it so I don't run out of calls for the demo
//const apiKey = "277792558525d895e036ffce5c0fef3"
// fetch(`http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=AAPL&limit=1`)
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));
// NOTE: most likely will scratch the fetch stock idea because of relevancy, though it is still TBC. 
