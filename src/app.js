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
    displayData.insertAdjacentHTML("afterend", "\n    <div class=\"displayRow\">\n      <p>".concat(getStorage[0].Name, " ").concat(getStorage[0].Surname, "</p>\n      \n    </div>\n    "));
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
