// ************************
// Event Listeners Go Here
// ************************

// New Enter Fillup
// click gathers data when all fields are populated
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
            <p>${currentMiles}</p>
            <p>${currentPrice}</p>
            <p>${currentGallons}</p>
            <p>${currentCost}</p>
        </section>
    `
}),


// New Clear Fillup
// click clears all fields
document.querySelector("#newClear").addEventListener("click", (e) => {
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