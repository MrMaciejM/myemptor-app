const form = document.getElementById("form") as HTMLFormElement;
const inpName = document.getElementById("name") as HTMLInputElement;
const inpSurname = document.getElementById("surname") as HTMLInputElement;
const inputFields = document.querySelectorAll("input, select");

const deleteAllBtn = document.getElementById("deleteAllBtn") as HTMLButtonElement;
const deleteBtnYes = document.getElementById("deleteBtnYes") as HTMLButtonElement;
const deleteBtnNo = document.getElementById("deleteBtnNo") as HTMLButtonElement;
const clearFieldsBtn = document.getElementById("clearBtn") as HTMLButtonElement;

const deleteModal = document.getElementById("deleteModal") as HTMLElement;
const modalCloseBtn = document.getElementById("modalCloseBtn") as HTMLParagraphElement;

const displayData = document.getElementById("displayDataSection") as HTMLElement;

// 1. Create LocalStorage if none exist for the app
const getStorage = JSON.parse(localStorage.getItem("myEmptor")!);
if (!getStorage) {
    localStorage.setItem("myEmptor", JSON.stringify([]))
} 

// 2. Display saved information 
function displayClientData() {
    const displayRows = document.querySelectorAll(".displayRow");
    displayRows.forEach(row => row.remove());    
    getStorage.map(item => {
        displayData.insertAdjacentHTML("beforeend", `
            <div class="displayRow">
            <p>${item.Name}</p>            
            <p>${item.Surname}</p>            
            <p>${item.Phone}</p>            
            <p>${item.Email}</p>            
            <p>${item.AppDate}</p>            
            <p>${item.Choice}</p>            
            <p>${item.StartDate}</p>            
            <p>${item.CurrStatus}</p>            
            <p>${item.Bank}</p>            
            <p>${item.Sum}</p>            
            <p>${item.RateExp}</p>            
            <p>${item.FirmIncome}</p>            
            <p>${item.MyPayment}</p>            
            <p>${item.MyNotes}</p>            
            <p>${item.SummaryActi}</p>
            </div>
        `);
    });    
}
displayClientData();

// APP LOGIC
form?.addEventListener("submit", (e) => {
    e.preventDefault(); 
    let array = getStorage;

    // prettier-ignore
    const fieldNames = ["Name","Surname","Phone","Email","AppDate","Choice","StartDate","CurrStatus","Bank","Sum","RateExp","FirmIncome","MyPayment","MyNotes","SummaryActi"];
    const clientData = {} as HTMLInputElement | HTMLSelectElement;

    for(let i = 0; i < 15; i++) {
        const userInputs = inputFields[i] as HTMLInputElement | HTMLSelectElement ;            
        //console.log(fieldNames[i], userInputs.value);
        clientData[fieldNames[i]] = userInputs.value;
    }
    array.push(clientData);
    localStorage.setItem("myEmptor", JSON.stringify(array));   
    displayClientData() 
})

function hideModal() {
    deleteModal.classList.add("hide"); 
}

// 3. DELETE ALL FUNCTIONALITY
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
    location.reload();
})
// Select "No" option
deleteBtnNo.addEventListener("click", (e) => {
    hideModal();
})

// 4. CLEAR FIELDS FUNCTIONALITY
clearFieldsBtn.addEventListener("click", (e) => { 
    inputFields.forEach(field => {
        field.value = "";
    })
})



// TEST FETCH CALL 

// ADD "f" to beginning of API key to make it work
// I disabled it so I don't run out of calls for the demo
const apiKey = "277792558525d895e036ffce5c0fef3"
// fetch(`http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=AAPL&limit=1`)
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));
// NOTE: most likely will scratch the fetch stock idea because of relevancy, though it is still TBC. 
