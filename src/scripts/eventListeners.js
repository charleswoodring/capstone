import dataManager from "./dataMgr"
// ************************
// Event Listeners Go Here
// ************************

// New Enter Fillup
// click gathers data when all fields are populated and clears entry fields
const newContainer = document.querySelector("#newEntry")

document.querySelector("#newEnter").addEventListener("click", (event) => {
    console.log("Enter was clicked")
    const currentMiles = document.querySelector("#currentMiles").value
    const currentPrice = document.querySelector("#currentPrice").value
    const currentGallons = document.querySelector("#currentGallons").value
    const currentCost = (currentPrice * currentGallons)
    // Clear current DOM
    newContainer.innerHTML = ""
    // Display on DOM
    newContainer.innerHTML += `
    <section>
    <h2>Last Entry</h2>
    <p>${currentDate.innerHTML}</p>
    <p>Current Miles: ${currentMiles}</p>
            <p>Price per Gallon: ${currentPrice}</p>
            <p>Gallons: ${currentGallons}</p>
            <p>Total Price: ${currentCost}</p>
            </section>
        `
        // Create fields for JSON
        const newFillup = {
        Date: `${currentDate.innerHTML}`,
        Miles: `${currentMiles}`,
        Price: `${currentPrice}`,
        Gallons: `${currentGallons}`
    }
        // push to session storage http://localhost:3000/fillups then clear entries
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
const historyContainer = document.querySelector("#history")

document.querySelector("#newHistory").addEventListener("click", (e) => {
    // console.log("History was clicked")
    dataManager.fetchFillups().then((
        myParsedHistory => {
            console.table(myParsedHistory)
            myParsedHistory.forEach(history => {
                historyContainer.innerHTML += `
                    <section>
                    <p>Date: ${history.Date}</p>
                    <p>Miles: ${history.Miles}</p>
                    <p>Price: ${history.Price}</p>
                    <p>Gallons: ${history.Gallons}</p>
                    </section>
                    `
                })
            })
            )
        })
// ***************************************************
// History cancel
// click returns to new entry screen
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


