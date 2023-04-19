const form = document.getElementById("form") as HTMLFormElement;
const inpName = document.getElementById("name") as HTMLInputElement;
const inpSurname = document.getElementById("surname") as HTMLInputElement;

const deleteAllBtn = document.getElementById("deleteAllBtn") as HTMLButtonElement;
const deleteBtnYes = document.getElementById("deleteBtnYes") as HTMLButtonElement;
const deleteBtnNo = document.getElementById("deleteBtnNo") as HTMLButtonElement;

const deleteModal = document.getElementById("deleteModal") as HTMLElement;
const modalCloseBtn = document.getElementById("modalCloseBtn") as HTMLParagraphElement;

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
    for(let i = 0; i < getStorage.length; i++) {
        displayData.insertAdjacentHTML("afterend", `
        <div class="displayRow" id="displayRow">
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
        <p>${getStorage[i].RateExp}</p>            
        <p>${getStorage[i].FirmIncome}</p>            
        <p>${getStorage[i].MyPayment}</p>            
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


function hideModal() {
    deleteModal.classList.add("hide"); 
}
// DELETE ALL FUNCTIONALITY
// Bring up the modal on Delete All click
deleteAllBtn.addEventListener("click", (e) => {
    deleteModal.classList.remove("hide");    
})
// Close Modal on clicking X
modalCloseBtn.addEventListener("click", (e) => { 
    hideModal();
})
// Wipe ALL Data
deleteBtnYes.addEventListener("click", (e) => {
    localStorage.setItem("myEmptor", JSON.stringify([]))
    const displayRow = document.getElementById("displayRow");
    displayRow?.remove();
    hideModal();
})
// Select "No" option
deleteBtnNo.addEventListener("click", (e) => {
    hideModal();
})


