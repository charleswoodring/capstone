import dataManager from "./dataMgr"
// ************************
// Event Listeners Go Here
// ************************

// New Enter Fillup
// click gathers data when all fields are populated and clears entry fields
// document.querySelector("#newHistory").addEventListener("click", (e) => {

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
})



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
    console.log("History was clicked")
    function clearDOM () {
        let x = document.getElementById("home")
        x.style.display = "none"
    }
    clearDOM()

    dataManager.fetchFillups().then((
        myParsedHistory => {
            for (let i = 0; i < myParsedHistory.length; i++) {
                if (i != 0) {
                    myParsedHistory[i].tankMiles = myParsedHistory[i].Miles -
                    myParsedHistory[i - 1].Miles;
                }

                console.table(myParsedHistory)
            }historyContainer.innerHTML = `
            <section>
            <h1>MPG-Trakkr</h1>
            <h2>History</h2>
            <button id=homeButton>Home</button>
            </section>
            `
            myParsedHistory.forEach(history => {
                if (history.tankMiles) {
                let intGallons = parseInt(history.Gallons)
                let roundGallons = Math.round(intGallons)
                let MPG = history.tankMiles / roundGallons
                    historyContainer.innerHTML += `
                    <section>
                    <p>-----------------------------------------------------</p>
                    <p>Date: ${history.Date}</p>
                    <p>Miles: ${history.tankMiles}</p>
                    <p>Gallons: ${history.Gallons}</p>
                    <p>Price: $${(history.Price * 1).toFixed(2)}</p>
                    <p>Cost: $${(history.Price * history.Gallons).toFixed(2)}</p>
                    <p>MPG:${(MPG).toFixed(2)}</p>
                    </section>
                    `
                }
                document.querySelector("#homeButton").addEventListener("click", (event) => {
                    console.log("home was clicked")
                function clearDOM () {
                    let x = document.getElementById("history")
                    x.style.display = "none"
                }
                    clearDOM()
                })
            })
        })
        )
    })
    // ***************************************************
// History cancel
// click returns to new entry screen
// document.querySelector("#homeButton").addEventListener("click", (event) => {
//     console.log("home was clicked")
// function clearDOM () {
//     let x = document.getElementById("history")
//     x.style.display = "none"
// }
//     clearDOM()
//     newContainer()
// })


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