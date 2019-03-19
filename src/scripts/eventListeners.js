import dataManager from "./dataMgr"
// ************************
// Event Listeners Go Here
// ************************

// New Enter Fillup
// click gathers data when all fields are populated and clears entry fields
const container = document.querySelector("#newEntry")

document.querySelector("#newEnter").addEventListener("click", (event) => {
    console.log("Enter was clicked")
    const currentMiles = document.querySelector("#currentMiles").value
    const currentPrice = document.querySelector("#currentPrice").value
    const currentGallons = document.querySelector("#currentGallons").value
    const currentCost = (currentPrice * currentGallons)
    container.innerHTML += `
        <section>
            <p>Last Entry</p>
            <p>${currentDate.innerHTML}</p>
            <p>Current Miles: ${currentMiles}</p>
            <p>Price per Gallon: ${currentPrice}</p>
            <p>Gallons: ${currentGallons}</p>
            <p>Total Price: ${currentCost}</p>
        </section>
        `
        const newFillup = {
        Date: `${currentDate.innerHTML}`,
        Miles: `${currentMiles}`,
        Price: `${currentPrice}`,
        Gallons: `${currentGallons}`
        }
        // push to session storage http://localhost:3000/dataFile and clear entries
        dataManager.saveEntry(newFillup).then (() => {
        document.getElementById("currentMiles").value = "";
        document.getElementById("currentPrice").value = "";
        document.getElementById("currentGallons").value = "";}
        )
}),


// New Clear Fillup
// click clears all fields
document.querySelector("#newClear").addEventListener("click", (event) => {
    console.log("Clear was clicked")
        function ClearFields() {
        document.getElementById("currentMiles").value = "";
        document.getElementById("currentPrice").value = "";
        document.getElementById("currentGallons").value = "";
   }
   ClearFields()
})

// New history
// click displays history data
document.querySelector("#newHistory").addEventListener("click", (e) => {
    console.log("History was clicked")
})
// ***************************************************

// History delete
// click shows alert box to confirm

// History delete alert
// click yes to delete and remove from datafile
// click no to return to history

// ***************************************************

// History edit
// click displays user input for editing

// History edit save
// click shows alert box to confirm

// History edit alert
// click yes to update datafile
// click no to return to History

// ***************************************************

// History cancel
// click returns to new entry screen