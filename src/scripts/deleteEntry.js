import refresh from "./eventListeners"

function deleteButton() {
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
}
export default deleteButton