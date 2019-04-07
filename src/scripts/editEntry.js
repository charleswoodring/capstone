import dataManager from "./dataMgr"
import displayHistory from "./displayHistory"
// import refresh from "./eventListeners"

    function editButton () {
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
                        document.querySelector("#editDate").innerHTML = `${objectToEdit.Date}`
                        document.querySelector("#editID").value = objectToEdit.id
                        document.querySelector("#editMiles").value = objectToEdit.Miles
                        document.querySelector("#editPrice").value = objectToEdit.Price
                        document.querySelector("#editGallons").value = objectToEdit.Gallons

                    }
                )
        }
document.querySelector("#editCancelButton").addEventListener("click", () => {
    console.log("Edit Cancel was clicked")
    displayHistory();
    // refresh();
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
        // .then(refresh())
})
// })
// )
// })
// ******************************************
// ** END EDIT ENTRY FROM HISTORY
// ******************************************

export default editButton