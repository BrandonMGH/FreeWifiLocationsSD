require('dotenv').config()
const express = require("express")
const fetch = require("node-fetch")
const app = express();
const PORT = 3000

let mapQuestAPIKey = process.env.MAPQUEST_API_KEY
let mapQuestAPIURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestAPIKey}&location=San+Diego,CA`


app.use(express.static("client/assets"));

app.get("/MapQuestInfo/:lat/:long", async (req, res) => {
    console.log(req.params)
    const fetch_response = await fetch(mapQuestAPIURL)
    const json = await fetch_response.json();
    res.json(json)
})

app.listen(PORT, () => {
    console.log("Server is running")
})