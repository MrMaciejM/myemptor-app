// FORM variables
const form = document.getElementById("form") as HTMLFormElement;
const inpName = document.getElementById("name") as HTMLInputElement;
const inpSurname = document.getElementById("surname") as HTMLInputElement;
const inputFields = document.querySelectorAll("input, select");

// BUTTONS
const deleteAllBtn = document.getElementById("deleteAllBtn") as HTMLButtonElement;
const deleteBtnYes = document.getElementById("deleteBtnYes") as HTMLButtonElement;
const deleteBtnNo = document.getElementById("deleteBtnNo") as HTMLButtonElement;
const clearFieldsBtn = document.getElementById("clearBtn") as HTMLButtonElement;

// MODAL
const deleteModal = document.getElementById("deleteModal") as HTMLElement;
const modalCloseBtn = document.getElementById("modalCloseBtn") as HTMLParagraphElement;

// DATA RENDERING
const displayData = document.getElementById("displayDataSection") as HTMLElement;
const displayRows = document.querySelectorAll(".displayRow");


// SORTING OPTIONS
const sortOptions = document.getElementById("sortOptions") as HTMLSelectElement;

// 1. Create LocalStorage if none exist for the app
const getStorage = JSON.parse(localStorage.getItem("myEmptor")!);
if (!getStorage) {
    localStorage.setItem("myEmptor", JSON.stringify([]))
} 

// 2. Display saved information 
function displayClientData() {
    const storageData = JSON.parse(localStorage.getItem("myEmptor")!) || []; 
    displayData.innerHTML = "";   
    storageData.forEach(item => {     
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

// 5. SORTING FUNCTIONALITY 

sortOptions.addEventListener("click", (e) => {
    const selectedOption = (e.target as HTMLOptionElement).value as string; 
      //console.log("sort by name is: " + selectedOption);
      // localStorage data which will be used for the filter
const dataArray = getStorage.map(item => {
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
    }
})
      // sorting logic 
      switch(selectedOption) {
        case "name-AZ":
            dataArray.sort((a, b) => a.Name.localeCompare(b.Name));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "name-ZA":
            //displayRows.forEach(row => row.remove());
            dataArray.sort((a, b) => b.Name.localeCompare(a.Name));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "surname-AZ":
            dataArray.sort((a, b) => a.Surname.localeCompare(b.Surname));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "surname-ZA":
            dataArray.sort((a, b) => b.Surname.localeCompare(a.Surname));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "applicationDateNew":
            dataArray.sort((a, b) => Date.parse(b.AppDate) - Date.parse(a.AppDate));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "applicationDateOld":
            dataArray.sort((a, b) => Date.parse(a.AppDate) - Date.parse(b.AppDate));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "bank":
            dataArray.sort((a, b) => b.Bank.localeCompare(a.Bank));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "sum":
            dataArray.sort((a, b) => parseFloat(b.Sum) - parseFloat(a.Sum));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "firmIncomeLow":
            dataArray.sort((a, b) => parseFloat(a.FirmIncome) - parseFloat(b.FirmIncome));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "firmIncomeHigh":
            dataArray.sort((a, b) => parseFloat(b.FirmIncome) - parseFloat(a.FirmIncome));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "myPaymentLow":
            dataArray.sort((a, b) => parseFloat(a.MyPayment) - parseFloat(b.MyPayment));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "myPaymentHigh":
            dataArray.sort((a, b) => parseFloat(b.MyPayment) - parseFloat(a.MyPayment));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
      }

}); // end of sorting function 

// TEST FETCH CALL 

// ADD "f" to beginning of API key to make it work
// I disabled it so I don't run out of calls for the demo
const apiKey = "277792558525d895e036ffce5c0fef3"
// fetch(`http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=AAPL&limit=1`)
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));
// NOTE: most likely will scratch the fetch stock idea because of relevancy, though it is still TBC. 
