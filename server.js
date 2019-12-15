const express = require("express")
// const axios = require("axios")
const path = require("path")
const app = express();
const PORT = 3000

app.use(express.static("client/assets"));

app.get("/MapQuestInfo", (req, res) => {
    axios(`http://www.mapquestapi.com/geocoding/v1/address?key=Caw3YlgZ6hKw9GVS49dNHOVfR1mqbGCy&location=San+Diego,CA`)
        .then(data => console.log(data))
})

app.listen(PORT, () => {
    console.log("Server is running")
})