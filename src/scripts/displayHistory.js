import dataManager from "./dataMgr"
import refresh from "./eventListeners"

const historyContainer = document.querySelector("#history")

function displayHistory () {
        dataManager.fetchFillups().then((
            myParsedHistory => {
                for (let i = 0; i < myParsedHistory.length; i++) {
                    if (i != 0) {
                        myParsedHistory[i].tankMiles = myParsedHistory[i].Miles -
                        myParsedHistory[i - 1].Miles;
                    }
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
                    document.querySelector("#homeButton").addEventListener("click", () => {
                        refresh();
                    })
                })
            })
            )}
            export default displayHistory