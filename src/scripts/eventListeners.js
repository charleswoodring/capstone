import dataManager from "./dataMgr"
import displayHistory from "./displayHistory"
import deleteButton from "./deleteEntry"
import editButton from "./editEntry"
// ************************
// Event Listeners Go Here
// ************************

// New Enter Fillup
function refresh() {
    window.location.reload();
}
// ******************************************
// ** NEW ENTRY
// ******************************************
document.querySelector("#newEnter").addEventListener("click", () => {

    console.log("Enter was clicked")
    const currentMiles = document.querySelector("#currentMiles").value
    const currentPrice = document.querySelector("#currentPrice").value
    const currentGallons = document.querySelector("#currentGallons").value
    // const currentCost = (currentPrice * currentGallons)

    const newFillup = {
        Date: `${currentDate.innerHTML}`,
        Miles: `${currentMiles}`,
        Price: `${currentPrice}`,
        Gallons: `${currentGallons}`
    }
    // push to session storage http://localhost:3000/fillups then clear entries
    dataManager.saveEntry(newFillup).then(() => {
        refresh()
    })
}
)
// ******************************************
// ** END NEW ENTRY
// ******************************************

// ******************************************
// ** DISPLAY LAST ENTRY
// ******************************************
const lastEntryContainer = document.querySelector("#lastEntry")
dataManager.fetchFillups().then(
    myParsedEntry => {
        for (let i = 0; i < myParsedEntry.length; i++) {
            if (i != 0) {
                myParsedEntry[i].tankMiles = myParsedEntry[i]["Miles"] - myParsedEntry[i - 1]["Miles"];
            }
        }
        // console.table(myParsedEntry)
        myParsedEntry.forEach(history => {
            if (history.tankMiles) {
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
// ******************************************
// ** END DISPLAY LAST ENTRY
// ******************************************

// ******************************************
// ** CLEAR ENTRY FIELDS
// ******************************************
document.querySelector("#newClear").addEventListener("click", () => {
    console.log("Clear was clicked")
    function ClearFields() {
        document.getElementById("currentMiles").value = "";
        document.getElementById("currentPrice").value = "";
        document.getElementById("currentGallons").value = "";
    }
    ClearFields()
})
// ******************************************
// ** END CLEAR ENTRY FIELDS
// ******************************************

// ******************************************
// ** DISPLAY HISTORY
// ******************************************
document.querySelector("#newHistory").addEventListener("click", () => {
    console.log("History was clicked")
    function clearDOM() {
        let x = document.getElementById("home")
        x.style.display = "none"
    }
    clearDOM()
    displayHistory()
// ******************************************
// ** END DISPLAY HISTORY
// ******************************************

// ******************************************
// ** DELETE ENTRY FROM HISTORY
// ******************************************
    // listen for click on entire history page
    document.querySelector("#history").addEventListener("click", (event) => {
    // check the target of the click to the delete button
        if (event.target.className === "deleteButton") {
    // delete the specific id of the target
        deleteButton(event.target.id)
        }
    })
// ******************************************
// ** END DELETE ENTRY FROM HISTORY
// ******************************************

// ******************************************
// ** EDIT ENTRY FROM HISTORY
// ******************************************
document.querySelector("#history").addEventListener("click", (event) => {
    // check the target of the click to the edit button
    if (event.target.className === "editButton") {
    // edit the specific id of the target
        editButton(event.target.id)
        }
    })
    })
    // ******************************************
    // ** END EDIT ENTRY FROM HISTORY
    // ******************************************
    // click SAVE to reload History
    // click CANCEL to return to History

    export default refresh