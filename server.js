require('dotenv').config()
const express = require("express")
const fetch = require("node-fetch")
const app = express();
const PORT = 3000

let mapQuestAPIKey = process.env.MAPQUEST_API_KEY
let mapQuestAPIURL = `http://www.mapquestapi.com/search/v2/radius?key=${mapQuestAPIKey}&maxMatches=4&origin=33.2398592,-117.2692321`


app.use(express.static("client/assets"));

app.get("/googleMap/:Location", (req, res) => {
    res.send(
        `<div style=background-color:blue;>
    <h1> ${req.params.Location} </h1>
     </div>
    `)
})

app.get("/MapQuestInfo/:lat/:long", async (req, res) => {
    let latitude = req.params.lat
    let longitude = req.params.long
    let mapQuestAPIURL = `http://www.mapquestapi.com/search/v2/radius?key=${mapQuestAPIKey}&maxMatches=4&origin=${latitude},${longitude}`
    const fetch_response = await fetch(mapQuestAPIURL)
    const json = await fetch_response.json();
    res.json(json)
})

app.listen(PORT, () => {
    console.log("Server is running")
})