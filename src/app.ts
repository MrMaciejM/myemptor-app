const form = document.getElementById("form") as HTMLFormElement;
const inpName = document.getElementById("name") as HTMLInputElement;
const inpSurname = document.getElementById("surname") as HTMLInputElement;

const displayData = document.getElementById("displayDataSection") as HTMLElement;

// 1. Create LocalStorage if none exist for the app
const getStorage = JSON.parse(localStorage.getItem("myEmptor")!);
if (!getStorage) {
    localStorage.setItem("myEmptor", JSON.stringify([]))
} 
console.log("Storage");
console.log(getStorage);


// 2. Display saved information 
function displayClientData() {
    console.log(getStorage.length);
    displayData.insertAdjacentHTML("beforeend", `
        <div class="displayRowHeadings">
        <p>Name</p>
        <p>Surname</p>
        <p>Phone</p>
        <p>Email</p>
        <p>Application Date</p>
        <p>Choice</p>
        <p>Start Date</p>
        <p>Current Status</p>
        <p>Bank</p>
        <p>Sum</p>
        <p>Rate Expander100 %</p>
        <p>Firm Income</p>
        <p>My Payment</p>
        <p>My Notes</p>
        <p>Summary Acti.</p>
        </div>`)

    for(let i = 0; i < getStorage.length; i++) {
        displayData.insertAdjacentHTML("afterend", `
        <div class="displayRow">
        <p>${getStorage[i].Name}</p>            
        <p>${getStorage[i].Surname}</p>            
        <p>${getStorage[i].Phone}</p>            
        <p>${getStorage[i].Email}</p>            
        <p>${getStorage[i].AppDate}</p>            
        <p>${getStorage[i].Choice}</p>            
        <p>${getStorage[i].StartDate}</p>            
        <p>${getStorage[i].CurrStatus}</p>            
        <p>${getStorage[i].Bank}</p>            
        <p>${getStorage[i].Sum}</p>            
        <p>${getStorage[i].FirmIncome}</p>            
        <p>${getStorage[i].MyNotes}</p>            
        <p>${getStorage[i].SummaryActi}</p>
        </div>
        `)
    }
}
displayClientData();

// APP LOGIC
form?.addEventListener("submit", (e) => {
    e.preventDefault(); 
    let array = getStorage;

    console.log(inpName.value);
    console.log(inpSurname.value);
    
    //get value and save to storage on submit
    array.push({"Name": inpName.value,"Surname": inpSurname.value})
    console.log(array);
    
    // display the 

})


