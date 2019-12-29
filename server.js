require('dotenv').config()

const express = require("express")
const fetch = require("node-fetch")
const path = require("path")
const app = express();
const PORT = 3000
let routeData = require("./client/assets/js/routeData.js")


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("client/assets"));

//** GET ROUTES  **//

app.get("/maproutes/", (req, res) => {;
    res.sendFile(path.join(__dirname, "./client/assets/mapRoute.html"))
})

app.get("/api/routeInfo", (req, res) =>{
    res.send(routeData)
})

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
    let mapQuestAPIKey = process.env.MAPQUEST_API_KEY
    let mapQuestAPIURL = `http://www.mapquestapi.com/search/v2/radius?key=${mapQuestAPIKey}&maxMatches=4&origin=${latitude},${longitude}`
    const fetch_response = await fetch(mapQuestAPIURL)
    const json = await fetch_response.json();
    res.json(json)
})

//** POST ROUTES **//

app.post("/userinfo", (req, res) => {
    let userInfo=req.body
    res.json(userInfo)
})


//** UPDATE ROUTES  **//

app.put("/api/routeInfo", (req, res) =>{
    routeData = {
    latitude: req.body.latitude,
    longitude: req.body.longitude
 }
 res.send(routeData)
})

console.log(routeData)

app.listen(PORT, () => {
    console.log("Server is running")
})