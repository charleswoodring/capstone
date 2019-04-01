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
    // newContainer.innerHTML = ""
    // Display on DOM
    // newContainer.innerHTML += `
    // Create fields for JSON
    const newFillup = {
        Date: `${currentDate.innerHTML}`,
        Miles: `${currentMiles}`,
        Price: `${currentPrice}`,
        Gallons: `${currentGallons}`
    }
    // push to session storage http://localhost:3000/fillups then clear entries
    dataManager.saveEntry(newFillup).then(() => {
        document.getElementById("currentMiles").value = "";
        document.getElementById("currentPrice").value = "";
        document.getElementById("currentGallons").value = "";
    }
    )
    window.location.reload();
}
)
//  Working on last entry static display
//
//
const lastEntryContainer = document.querySelector("#lastEntry")
dataManager.fetchFillups().then(
    myParsedEntry => {
        for (let i = 0; i < myParsedEntry.length; i++) {
            if (i != 0) {
                // debugger
                myParsedEntry[i].tankMiles = myParsedEntry[i]["Miles"] - myParsedEntry[i - 1]["Miles"];
            }
            // console.table(myParsedEntry)
        }
        myParsedEntry.forEach(history => {
            if (history.tankMiles) {
                let intGallons = parseInt(history.Gallons)
                let roundGallons = Math.round(intGallons)
                let MPG = history.tankMiles / history.Gallons
                lastEntryContainer.innerHTML = `
            <section>
            <h3>Last Entry</h3>
                    <p>Date: ${history.Date}</p>
                    <p>Miles: ${history.tankMiles}</p>
                    <p>Gallons: ${history.Gallons}</p>
                    <p>Price: $${(history.Price * 1).toFixed(3)}</p>
                    <p>Cost: $${(history.Price * history.Gallons).toFixed(2)}</p>
                    <p>MPG:${(MPG).toFixed(2)}</p>
            </section>
            `
            }
        })
    })

//
//
//end of last entry diaplsy

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
    function clearDOM() {
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

                // console.table(myParsedHistory)
            } historyContainer.innerHTML = `
            <section>
            <h1>MPG-Trakkr</h1>
            <h2>History</h2>
            <button id=homeButton>Home</button>
            </section>
            `
            myParsedHistory.reverse()
            myParsedHistory.forEach(history => {
                if (history.tankMiles) {
                    let intGallons = parseInt(history.Gallons)
                    let roundGallons = Math.round(intGallons)
                    let MPG = history.tankMiles / history.Gallons
                    historyContainer.innerHTML += `
                    <section>
                    <p>-----------------------------------------------------</p>
                    <p>Date: ${history.Date}</p>
                    <p>Miles: ${history.tankMiles}</p>
                    <p>Gallons: ${history.Gallons}</p>
                    <p>Price: $${(history.Price * 1).toFixed(3)}</p>
                    <p>Cost: $${(history.Price * history.Gallons).toFixed(2)}</p>
                    <p>MPG:${(MPG).toFixed(2)}</p>
                    <button id=editButton>Edit</button>
                    <button id=${history.id} class=deleteButton>Delete</button>
                    </section>
                    `
                }
                document.querySelector("#homeButton").addEventListener("click", (event) => {
                    console.log("home was clicked")
                    window.location.reload();
                })
            })

            //iterate over the arrray add event listener to each node

                document.querySelectorAll(".deleteButton").forEach(
                    function (deleteButton) {
                        deleteButton.addEventListener("click", (event) => {
                            console.log("delete was clicked")
                            if (window.confirm("Delete, are you sure?")) {
                                console.log("delete confirmed")
                                    console.log(`http://localhost:3000/fillups/${event.target.id}`)
                                    return fetch(`http://localhost:3000/fillups/${event.target.id}`, {
                                        method: "DELETE"
                                    }).then(Response => Response.json())
                                    .then(window.location.reload());
                              } else {
                                console.log("delete cancelled")
                              }
                        })
                    }
                    )
                            })
            // document.querySelector("editButton").addEventListener("click", (event) =>
            // console.log("edit was clicked")
            // )
    )
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