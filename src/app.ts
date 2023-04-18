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
    displayData.insertAdjacentHTML("afterend", `
    <div class="displayRow">
      <p>${getStorage[0].Name} ${getStorage[0].Surname}</p>
      
    </div>
    `)
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