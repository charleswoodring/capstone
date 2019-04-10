import dataManager from "./dataMgr"
import refresh from "./eventListeners"

//CLEAR HISTORY DOM FUNCTION
function clearHistory() {
    let x = document.getElementById("history")
    x.style.display = "none"
}
//REDISPLAY HISTORY DOM FUNCTION
function reDisplayHistory() {
    let x = document.getElementById("history")
    x.style.display = "block"
}
// CLEAR HISTORY DOM
function editButton() {
    clearHistory()

    // DIAPLAY THE EDIT PAGE FROM HTML
    document.querySelector("#edit").style.display = "block"
    // GET SPECIFIC OBJECT TO BE EDITED (editEntry function in .dataMgr)
    dataManager.editEntry(event.target.id)
    // TARGET EMPTY HTML FIELDS AND PLACE CORRECT VALUES IN EACH
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
// ******************************************
// SAVE EDITED OBJECT LISTENER
// ******************************************
document.querySelector("#editSaveButton").addEventListener("click", () => {
// GRAB INPUT (#xxx) VALUES AND STORE THEM IN VARIABLES (const xxx)
    const editdDate = document.querySelector("#editDate").innerHTML
    const editedMiles = document.querySelector("#editMiles").value
    const editedPrice = document.querySelector("#editPrice").value
    const editedGallons = document.querySelector("#editGallons").value

// CREATE NEW OBJECT (const xxx) USING VARIABLES DECLARED ABOVE (const ###)
    const editedFillup = {
        Date: `${editdDate}`,
        Miles: `${editedMiles}`,
        Price: `${editedPrice}`,
        Gallons: `${editedGallons}`
    }
// REPLACE OBJECT WITH MATCHING ID IN JSON AND RELOAD
    const idToEdit = document.querySelector("#editID").value
    dataManager.saveEdit(idToEdit, editedFillup)
        refresh()
})
// ******************************************
// ** END EDIT ENTRY FROM HISTORY
// ******************************************
// ******************************************
// CANCEL BUTTON LISTENER
// ******************************************
document.querySelector("#editCancelButton").addEventListener("click", () => {
    reDisplayHistory()
})

export default editButton