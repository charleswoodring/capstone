import dataManager from "./dataMgr"
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
document.querySelector("#newEnter").addEventListener("click", (event) => {

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
                // debugger
                myParsedEntry[i].tankMiles = myParsedEntry[i]["Miles"] - myParsedEntry[i - 1]["Miles"];
            }
        }
        // console.table(myParsedEntry)
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
// ******************************************
// ** END DISPLAY LAST ENTRY
// ******************************************

// ******************************************
// ** CLEAR ENTRY FIELDS
// ******************************************
document.querySelector("#newClear").addEventListener("click", (event) => {
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
const historyContainer = document.querySelector("#history")
document.querySelector("#newHistory").addEventListener("click", (e) => {
    console.log("History was clicked")
    function clearDOM() {
        let x = document.getElementById("home")
        x.style.display = "none"
    }
    clearDOM()
//start history function
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
                    <button id=${history.id} class=editButton>Edit</button>
                    <button id=${history.id} class=deleteButton>Delete</button>
                    </section>
                    `
                }
                document.querySelector("#homeButton").addEventListener("click", (event) => {
                    console.log("home was clicked")
                    refresh();
                })
            })
            //end history function
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
            // debugger
            document.querySelectorAll(".editButton").forEach(
                function (editButton) {
                    editButton.addEventListener("click", (event) => {
                        console.log("Edit was clicked")
                        function clearDOM() {
                            let x = document.getElementById("history")
                            x.style.display = "none"
                        }
                        clearDOM()
                        // console.table(`http://localhost:3000/fillups/${event.target.id}`)
                        document.querySelector("#edit").style.display = "block"
                        dataManager.editEntry(event.target.id).then(
                            (edit) => {
                                document.querySelector("#editDate").innerHTML=`Date: ${edit.Date}`
                                document.querySelector("#editMiles").value=edit.Miles
                                document.querySelector("#editPrice").value=edit.Price
                                document.querySelector("#editGallons").value=edit.Gallons

                            }
                            )

                    })
                }
            )
            document.querySelector("#editCancelButton").addEventListener("click", (event) => {
                console.log("Edit Cancel was clicked")
                // refresh();
            })
            document.querySelector("#editSaveButton").addEventListener("click", (event) => {
                console.log("Edit Save was clicked")
                // push to json and refresh;
            })
        })
    )
})
// ******************************************
// ** END EDIT ENTRY FROM HISTORY
// ******************************************
// History edit
// click displays user input for editing
// click SAVE to update datafile and reload
// click CANCEL to return to History