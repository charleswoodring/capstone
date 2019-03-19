const dataManager = {
saveEntry: (newFillup) => {
    return fetch("http://localhost:3000/fillups", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFillup)
    }).then(newFillup  => newFillup.json())
}
}
export default dataManager