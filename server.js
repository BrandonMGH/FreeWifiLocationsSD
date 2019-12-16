const express = require("express")
const fetch = require("node-fetch")
const app = express();
const PORT = 3000

app.use(express.static("client/assets"));

app.get("/MapQuestInfo", async (req, res) => {
   const fetch_response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=Caw3YlgZ6hKw9GVS49dNHOVfR1mqbGCy&location=San+Diego,CA`)
   const json = await fetch_response.json(); 
   res.json(json)
})

app.listen(PORT, () => {
    console.log("Server is running")
})