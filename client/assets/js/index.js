

const currentLocButton = document.getElementById("currentLocButton")
const customLocButton = document.getElementById("customLocButton")
const mymap = L.map('mapid').setView([32.81576, -117.163817], 12);
const greenIcon = L.icon({
  iconUrl: './images/arrowdownred.png',
  shadowUrl: './images/arrowdownredshadow.png',
  iconSize:     [50, 64], 
  shadowSize:   [50, 64], 
  iconAnchor:   [22, 94], 
  shadowAnchor: [18, 90],  
  popupAnchor:  [-3, -76] 
});
const myMarker= L.marker([32.81576, -117.163817], {icon: greenIcon}).addTo(mymap);
const markerObject = { 
  balboaParkMarker:L.marker([32.730831, -117.142586]).addTo(mymap),
  aleSmithBrewingCompany: L.marker([32.888168, -117.149643]).addTo(mymap),
  ballastPointBrewingAndSpirits: L.marker([32.887871, -117.158119]).addTo(mymap),
  fairmontGrandDelMar: L.marker([32.938412, -117.197357]).addTo(mymap),
  petcoPark: L.marker([32.706539, -117.156349]).addTo(mymap),
  halfDoorBrewingCompany: L.marker([32.5417302, -117.163817]).addTo(mymap),
  theTacoStandDowntown: L.marker([32.717740, -117.158670]).addTo(mymap),
  societeBrewingCompany: L.marker([32.834900, -117.146180]).addTo(mymap),
  fashionValley: L.marker([32.768051, -117.166901]).addTo(mymap),
  harrysCoffeeShop: L.marker([32.841530, -117.272440]).addTo(mymap),
  laValenciaHotel: L.marker([32.848640, -117.273770]).addTo(mymap),
  eddieVsPrimeSeafood: L.marker([32.849610, -117.271150]).addTo(mymap),
  islandPrimeAndCLevel: L.marker([32.724370, -117.188640]).addTo(mymap),
  bOBeauKitchenBar: L.marker([32.753050, -117.245110]).addTo(mymap),
  cafeMoto: L.marker([32.695630, -117.137660]).addTo(mymap),
  philzCoffeeShop: L.marker([32.977310, -117.230377]).addTo(mymap),
  firstMarket: L.marker([32.5417302, -117.163817]).addTo(mymap),
  firstMarket: L.marker([32.5417302, -117.163817]).addTo(mymap),
  firstMarket: L.marker([32.5417302, -117.163817]).addTo(mymap),
  firstMarket: L.marker([32.5417302, -117.163817]).addTo(mymap),
}
const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);;

let getLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCords);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

let printMap = function (Lat, Long) {
  mymap.setView([Lat, Long], 12)
  myMarker.setLatLng([Lat, Long], 12).bindPopup("<b>You are here!</b>.").openPopup();
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

let onMapClick = function (e) {
  alert("You clicked the map at " + e.latlng);
}

mymap.on('click', onMapClick);
