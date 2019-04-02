const dataManager =  {
saveEntry: (newFillup) => {
    console.log("added new")
    return fetch("http://localhost:3000/fillups", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFillup)
    }).then(newFillup  => newFillup.json())
},
fetchFillups: function()  {
    return fetch("http://localhost:3000/fillups")
    .then(Response => Response.json())
    }
    }
export default dataManager