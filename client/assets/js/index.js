

const currentLocButton = document.getElementById("currentLocButton")
const customLocButton = document.getElementById("customLocButton")
// const mymap = L.map('mapContainer').setView([0, 0], 0);
// const mymarker = L.marker([0,0]).addTo(mymap)

let mymap = L.map('mapid').setView([51.505, -0.09], 13);

let latitude = "32.81576"
let longitude = "-117.163817"

let getLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCords);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

let printMap = function (Lat, Long) {
  mymap.setView([Lat, Long], 12)
  mymarker.setLatLng([Lat, Long], 12)
}

let getCords = function (position) {
  latitude = position.coords.latitude
  longitude = position.coords.longitude
  console.log(`Latitude: ${latitude}, Longitutde: ${longitude}`)
  fetchGet(latitude, longitude)
  printMap(latitude, longitude)
}

let fetchGet = function (paramOne, paramTwo) {
  fetch(`http://localhost:3000/MapQuestInfo/${paramOne}/${paramTwo}`)
    .then(res => res.json())
    .then(data => {
      let addressInfo = data.searchResults[0].fields
      let address = addressInfo.address
      let city = addressInfo.city
      let state = addressInfo.state
      let zipCode = addressInfo.postal_code
      console.log(addressInfo)
      document.getElementById("addressLineOne").innerHTML = address
      document.getElementById("addressLineTwo").innerHTML = `${city}, ${state}, ${zipCode}`

    })
}


currentLocButton.onclick = function () {
  getLocation()
}

