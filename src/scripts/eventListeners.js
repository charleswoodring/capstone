import dataManager from "./dataMgr"
import displayHistory from "./displayHistory"
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
                                .then(refresh());
                        } else {
                            console.log("delete cancelled")
                        }
                    })
                }
            )
            // ******************************************
            // ** END DELETE ENTRY FROM HISTORY
            // ******************************************

            // ******************************************
            // ** EDIT ENTRY FROM HISTORY
            // ******************************************
            document.querySelectorAll(".editButton").forEach(
                function (editButton) {
                    editButton.addEventListener("click", (event) => {
                        console.log("Edit was clicked")
                        // Clear history page to display only the edit page
                        function clearDOM() {
                            let x = document.getElementById("history")
                            x.style.display = "none"
                        }
                        clearDOM()
                        // displays the edit page from html
                        document.querySelector("#edit").style.display = "block"
                        // GET specific object to be edited (function in dataMgr)
                        dataManager.editEntry(event.target.id)
                            // Target empty html fields and place correct values in each
                            .then(
                                (objectToEdit) => {
                                    document.querySelector("#editDate").innerHTML = `Date: ${objectToEdit.Date}`
                                    document.querySelector("#editID").value = objectToEdit.id
                                    document.querySelector("#editMiles").value = objectToEdit.Miles
                                    document.querySelector("#editPrice").value = objectToEdit.Price
                                    document.querySelector("#editGallons").value = objectToEdit.Gallons

                                }
                            )
                    })
                }
            )
            document.querySelector("#editCancelButton").addEventListener("click", () => {
                console.log("Edit Cancel was clicked")
                displayHistory();
            })
            // ******************************************
            // SAVE EDITED OBJECT
            // ******************************************
            document.querySelector("#editSaveButton").addEventListener("click", () => {
                console.log("Edit Save was clicked")
                // grab input (#xxx) values store them in variables (const xxx)
                const editdDate = document.querySelector("#editDate").innerHTML
                const editedMiles = document.querySelector("#editMiles").value
                const editedPrice = document.querySelector("#editPrice").value
                const editedGallons = document.querySelector("#editGallons").value

                // create new object (const xxx) using variables declared above (const ###)
                const editedFillup = {
                    Date: `${editdDate}`,
                    Miles: `${editedMiles}`,
                    Price: `${editedPrice}`,
                    Gallons: `${editedGallons}`
                }
                // replace object with matching ID in json
                const idToEdit = document.querySelector("#editID").value
                dataManager.saveEdit(idToEdit, editedFillup)
                .then(displayHistory())
            })
        // })
    // )
})
    // ******************************************
    // ** END EDIT ENTRY FROM HISTORY
    // ******************************************
    // click SAVE to reload History
    // click CANCEL to return to History