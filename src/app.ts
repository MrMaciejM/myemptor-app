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

// 2. Display saved information/client data
function displayClientData() {
    let storageData = JSON.parse(localStorage.getItem("myEmptor")!) || []; 
    //console.log(storageData);    
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
            <button class="delClientBtn" id=${item.id}>X</button>
            </div>
        `);
    });    
}
displayClientData();

// Form Submission Logic
form?.addEventListener("submit", (e) => {
    e.preventDefault(); 
    let array = getStorage || [];

    // prettier-ignore
    const fieldNames = ["Name","Surname","Phone","Email","AppDate","Choice","StartDate","CurrStatus","Bank","Sum","RateExp","FirmIncome","MyPayment","MyNotes","SummaryActi", "id"];
    const clientData = {} as HTMLInputElement | HTMLSelectElement;

    // preparing data to be stored in key value pairs {"fieldNames[i]": "userInputs.value"} and pushing to localStorage
    if(inputFields !== null) {
    for(let i = 0; i < 16; i++) {
        const userInputs = inputFields[i] as HTMLInputElement | HTMLSelectElement ;              
        clientData[fieldNames[i]] = userInputs.value;
    }
    } // end of if
    // sets ID on each object - forgot to do it initially, so the ID is in the last place to avoid breaking storing and retreiving objects
    let counter = 0; 
    if (getStorage !== null && getStorage.length !== null) {
        counter = getStorage.length; 
      }
    clientData.id = counter; 
    
    array.push(clientData);
    localStorage.setItem("myEmptor", JSON.stringify(array));   
    //displayClientData(); 
    location.reload();
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
        SummaryActi: item.SummaryActi,
        id: item.id
    }
})
      // sorting logic 
      switch(selectedOption) {
        case "name-AZ":
            dataArray.sort((a: string, b: string) => a.Name.localeCompare(b.Name));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "name-ZA":
            //displayRows.forEach(row => row.remove());
            dataArray.sort((a: string, b: string) => b.Name.localeCompare(a.Name));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "surname-AZ":
            dataArray.sort((a: string, b: string) => a.Surname.localeCompare(b.Surname));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "surname-ZA":
            dataArray.sort((a: string, b: string) => b.Surname.localeCompare(a.Surname));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "applicationDateNew":
            dataArray.sort((a: Date, b: Date) => Date.parse(b.AppDate) - Date.parse(a.AppDate));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "applicationDateOld":
            dataArray.sort((a: Date, b: Date) => Date.parse(a.AppDate) - Date.parse(b.AppDate));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "bank":
            dataArray.sort((a: string, b: string) => b.Bank.localeCompare(a.Bank));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "sum":
            dataArray.sort((a: number, b: number) => parseFloat(b.Sum) - parseFloat(a.Sum));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "firmIncomeLow":
            dataArray.sort((a: number, b: number) => parseFloat(a.FirmIncome) - parseFloat(b.FirmIncome));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "firmIncomeHigh":
            dataArray.sort((a: number, b: number) => parseFloat(b.FirmIncome) - parseFloat(a.FirmIncome));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "myPaymentLow":
            dataArray.sort((a: number, b: number) => parseFloat(a.MyPayment) - parseFloat(b.MyPayment));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
        case "myPaymentHigh":
            dataArray.sort((a: number, b: number) => parseFloat(b.MyPayment) - parseFloat(a.MyPayment));
            localStorage.setItem("myEmptor", JSON.stringify(dataArray));
            displayClientData();
            break;
      }

}); // end of sorting function 

// 6. REMOVE SINGLE CLIENT ON MOUSE CLICK
const deleteClientBtn = document.getElementsByClassName("delClientBtn");

for (let i = 0; i < deleteClientBtn.length; i++) {
    
    displayData.addEventListener("click", (e) => {  
        console.log("clicked + target id: " e.target.getAttribute("id"));
              
        let getId = e.target.getAttribute("id");
        getId = parseInt(getId); 
        //console.log("type of getId:" + typeof(getId));        
        const clientData = JSON.parse(localStorage.getItem("myEmptor"));
        const itemIndex = clientData.findIndex(index => index.id === getId)  

      if (itemIndex !== -1) {
        //console.log("inside item index");        
        clientData.splice(itemIndex, 1);
        localStorage.setItem("myEmptor", JSON.stringify(clientData));
        //console.log(clientData);
        location.reload() 
      }
    });
  };

// 7. BACKUP OF DATA AND SHOWING BACKUP TIME
const backupBtn = document.getElementById("backupBtn");
if(!localStorage.getItem("myEmptorTime")) {
    localStorage.setItem("myEmptorTime", JSON.stringify(""))
};

function showLastBackupTime() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");    
    const formattedDate = `${day}-${monthName}-${year} ${hours}:${minutes}`;
    //console.log(formattedDate);
    return formattedDate;    
  }

const updateTime = document.getElementById("backupTimeParagraph");
const getTime = localStorage.getItem("myEmptorTime");
// sets the p tag with last backup time
updateTime?.textContent = `Last backup was on ${getTime?.replaceAll('"',"")}`; 

// update time on click, and take backup.
const getBackupData = localStorage.getItem("myEmptorBackup")
    if(!getBackupData) {
        localStorage.setItem("myEmptorBackup", JSON.stringify([])); 
        
    }
backupBtn?.addEventListener("click", (e) => {
    localStorage.setItem("myEmptorTime", JSON.stringify(showLastBackupTime()))
    updateTime?.textContent = `Last backup was on ${getTime?.replaceAll('"',"")}`; 
    const backupBtnDiv = document.getElementById("backupBtnDiv");
    localStorage.setItem("myEmptorBackup", JSON.stringify(getStorage));
    location.reload();
})
showLastBackupTime();
    
// 8. RESTORE FROM BACKUP
const restoreBtn = document.getElementById("restoreBtn"); 
restoreBtn?.addEventListener("click", (e) => {
    console.log("clicked");    
    const emptorBackup = JSON.parse(localStorage.getItem("myEmptorBackup"));
    localStorage.setItem("myEmptor", JSON.stringify(emptorBackup))
    //displayClientData()
    location.reload();
    console.log(emptorBackup);    
})


// TEST FETCH CALL 

// ADD "f" to beginning of API key to make it work
// I disabled it so I don't run out of calls for the demo
//const apiKey = "277792558525d895e036ffce5c0fef3"
// fetch(`http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=AAPL&limit=1`)
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));
// NOTE: most likely will scratch the fetch stock idea because of relevancy, though it is still TBC. 
