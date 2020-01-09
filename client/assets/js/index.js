import { markerInfo } from "./Data/mapData.js"

let currentLat = 32.81576
let currentLong = -117.163817
let locationObj = {
  locationName: "Default",
  locationAddress: "Default" 
}
const addressTitle = document.getElementById("addressTitle")
const addressLocation = document.getElementById("addressLocation")
const currentLocButton = document.getElementById("currentLocButton")
const modalBackground = document.getElementById("modalBackground")
const span = document.getElementsByClassName("close")[0];
const mymap = L.map('mapid', {closePopupOnClick: false}).setView([32.81576, -117.163817], 12);
const blueMarkerArrow = L.icon({
  iconUrl: './images/BlueMarkerArrow.png',
  iconSize:     [45, 45], 
  iconAnchor:   [22, 94], 
  popupAnchor:  [-3, -76] 
})
const redMarkerArrow = L.icon({
  iconUrl: './images/RedMarkerArrow.png',
  iconSize:     [45, 45], 
  iconAnchor:   [22, 94], 
  popupAnchor:  [-3, -76] 
})
const greenMarkerArrow = L.icon({
  iconUrl: './images/GreenMarkerArrow.png',
  iconSize:     [45, 45], 
  iconAnchor:   [22, 94], 
  popupAnchor:  [-3, -76] 
})
const currentLocIcon = L.icon({
  iconUrl: './images/arrowdownred.png',
  shadowUrl: './images/arrowdownredshadow.png',
  iconSize:     [50, 64], 
  shadowSize:   [50, 64], 
  iconAnchor:   [22, 94], 
  shadowAnchor: [18, 90],  
  popupAnchor:  [-3, -76] 
});
const myMarker= L.marker([currentLat, currentLong], {icon: currentLocIcon}).addTo(mymap);

let showMapRoute = function (addressInfo)  {
  modalBackground.style.display= "block"
  addressTitle.innerHTML = addressInfo.locationName
  addressLocation.innerHTML = addressInfo.locationAddress
}

markerInfo.map(location => {
  console.log(location)
    L.marker([location.endLat, location.endLong], location.locationType === "Independent" ? {icon:greenMarkerArrow} : location.locationType === "Corporate" ? {icon: redMarkerArrow} : {icon:blueMarkerArrow} ).addTo(mymap).bindPopup(`<div id=marketPopUp><b>${location.locationName}</b><button class=markerPopUpButton>Generate Map</button></div>.`).on('click', function () {
    $.ajax({
      url:  `/api/routeInfo/`,
      method: `PUT`,
      dataType: `json`,
      data: {
        currentLat: currentLat,
        currentLong: currentLong,
        endLat: location.endLat,
        endLong: location.endLong
      },
      success: function(data){
        console.log(data);
      }
    })
  
    locationObj.locationName = `${location.locationName}`
    locationObj.locationAddress = `${location.locationAddress}`
    
       
  })
})

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
   currentLat = position.coords.latitude
   currentLong = position.coords.longitude
  console.log(`Latitude: ${currentLat}, Longitutde: ${currentLong}`)
  fetchMapQuestAddress(currentLat, currentLong)
  printMap(currentLat, currentLong)
}

let fetchMapQuestAddress = function (paramOne, paramTwo) {
  fetch(`/MapQuestInfo/${paramOne}/${paramTwo}`)
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

// ** ON CLICK EVENTS ** // 

$(document).on('click', '.markerPopUpButton', function() {
  showMapRoute(locationObj)
})

currentLocButton.onclick = function () {
  getLocation()
}

span.onclick = function () {
  modalBackground.style.display= "none"
}

