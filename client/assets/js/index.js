let currentLat = 32.81576
let currentLong = -117.163817
let locationObj = {
  locationName: "Default",
  locationAddress: "Default" 
}
let markerInfo = [
  {
     locationName: "Balboa Park",
     locationAddress: "San Diego, CA",
     endLat: 32.730831,
     endLong: -117.142586
   },
   {
     locationName: "AleSmith Brewing Company",
     locationAddress: "9990 AleSmith Ct, San Diego, CA 92126",
     endLat: 32.888168,
     endLong: -117.149643
   },
   {
    locationName: "Ballast Point Brewing and Spirits",
    locationAddress: "9045 Carroll Way, San Diego, CA 92121",
    endLat: 32.887871,
    endLong: -117.158119
  },
  {
    locationName: "Fairmont Grand Del Mar",
    locationAddress: "9045 Carroll Way, San Diego, CA 92121",
    endLat: 32.938412,
    endLong: -117.197357
  },
  {
    locationName: "PetCo Park",
    locationAddress: "100 Park Blvd, San Diego, CA 92101",
    endLat: 32.706539,
    endLong: -117.156349
  },
  {
    locationName: "Half Door Brewing Co.",
    locationAddress: "903 Island Ave, San Diego, CA 92101",
    endLat: 32.710239,
    endLong: -117.156258
  },
  {
    locationName: "Societe Brewing Company",
    locationAddress: "8262 Clairemont Mesa Blvd, San Diego, CA 92111",
    endLat: 32.834900,
    endLong: -117.146180
  },
  {
    locationName: "Fashion Valley",
    locationAddress: "7007 Friars Rd, San Diego, CA 92108",
    endLat: 32.768051,
    endLong: -117.166901
  },
  {
    locationName: "harrysCoffeeShop",
    locationAddress: "7545 Girard Ave, La Jolla, CA 92037",
    endLat: 32.841530,
    endLong: -117.272440
  },
  {
    locationName: "La Valencia Hotel",
    locationAddress: "1132 Prospect St, La Jolla, CA 92037",
    endLat: 32.848640,
    endLong: -117.273770
  },
  {
    locationName: "Eddie V's Prime Seafood",
    locationAddress: "1270 Prospect St, La Jolla, CA 92037",
    endLat: 32.849610,
    endLong: -117.271150
  },
  {
    locationName: "Island Prime",
    locationAddress: "880 Harbor Island Dr, San Diego, CA 92101",
    endLat: 32.724370,
    endLong: -117.188640
  },
  {
    locationName: "BO-beau kitchen + bar",
    locationAddress: "4996 W Point Loma Blvd, San Diego, CA 92107",
    endLat: 32.753050,
    endLong: -117.245110
  },
  {
    locationName: "Cafe Moto",
    locationAddress: "2619 National Ave, San Diego, CA 92113",
    endLat: 32.695630,
    endLong: -117.137660
  },
  {
    locationName: "Philz Coffee Shop Del Mar",
    locationAddress: "Highlands Town Center, 12873 El Camino Real m1 Del Mar, San Diego, CA 92130",
    endLat: 32.952070,
    endLong: -117.232490
  },

 
 ]

const addressTitle = document.getElementById("addressTitle")
const addressLocation = document.getElementById("addressLocation")
const currentLocButton = document.getElementById("currentLocButton")
const customLocButton = document.getElementById("customLocButton")
const modalBackground = document.getElementById("modalBackground")
const span = document.getElementsByClassName("close")[0];

const mymap = L.map('mapid', {closePopupOnClick: false}).setView([32.81576, -117.163817], 12);
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
    L.marker([location.endLat, location.endLong]).addTo(mymap).bindPopup(`<b>${location.locationName}</b><button onclick=showMapRoute(locationObj)>Generate Map</button>.`).on('click', function () {
    $.ajax({
      url: `http://localhost:3000/api/routeInfo/`,
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

span.onclick = function () {
  modalBackground.style.display= "none"
}
