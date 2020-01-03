let currentLat = 32.81576
let currentLong = -117.163817
let locationObj = {
  locationName: "Default",
  locationAddress: "Default" 
}

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

let testObejct = [
 {
    locationName: "Test Location",
    location: "San Diego, CA",
    endLat: 32.5417302,
    endLong: -117.163817
  },
  {
    locationName: "Balboa Park",
    location: "San Diego, CA",
    endLat: 32.730831,
    endLong: -117.142586
  }

]

testObejct.map(location => {
  console.log(location)
    L.marker([location.endLat, location.endLong]).addTo(mymap).bindPopup(`<b>${location.locationName}</b><button onclick=showMapRoute(locationObj)>Generate Map</button>.`).on('click', function () {
    $.ajax({
      url: `http://localhost:3000/api/routeInfo/`,
      method: `PUT`,
      dataType: `json`,
      data: {
        locationName: `${location.locationName}`,
        locationAddress: `${location.location}`,
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
    locationObj.locationAddress = `${location.locationName}`
    
       
  })
})

// const markerObject = { 
//   balboaParkMarker:L.marker([32.730831, -117.142586]).addTo(mymap).bindPopup("<b> Balboa Park </b><button onclick=showMapRoute(locationObj)>Generate Map</button>.").on('click', function () {
//     $.ajax({
//       url: `http://localhost:3000/api/routeInfo/`,
//       method: `PUT`,
//       dataType: `json`,
//       data: {
//         locationName: "Balboa Park",
//         locationAddress: "San Diego, CA",
//         currentLat: currentLat,
//         currentLong: currentLong,
//         endLat: 32.730831,
//         endLong: -117.142586
//       },
//       success: function(data){
//         console.log(data);
//       }
//     })
  
//     locationObj.locationName = "Balboa Park"
//     locationObj.locationAddress = "San Diego, CA" 
    
       
//   }),
//   aleSmithBrewingCompany: L.marker([32.888168, -117.149643]).addTo(mymap).bindPopup("<b>Ale Smith Brewing Company</b><button onclick=showMapRoute(locationObj)>Generate Map</button>.").on('click', function () {
//     $.ajax({
//       url: `http://localhost:3000/api/routeInfo/`,
//       method: `PUT`,
//       dataType: `json`,
//       data: {
//         currentLat: currentLat,
//         currentLong: currentLong,
//         endLat: 32.888168,
//         endLong: -117.149643
//       },
//       success: function(data){
//         console.log(data);
//       }
//     })

//     locationObj.locationName = "AleSmith Brewing Company"
//     locationObj.locationAddress = "9990 AleSmith Ct, San Diego, CA 92126" 
//   }),
//   ballastPointBrewingAndSpirits: L.marker([32.887871, -117.158119]).addTo(mymap).bindPopup("<b>Ballast Point Brewing and Spirits</b><button onclick=showMapRoute(locationObj)>Generate Map</button>.").on('click', function () {
//     $.ajax({
//       url: `http://localhost:3000/api/routeInfo/`,
//       method: `PUT`,
//       dataType: `json`,
//       data: {
//         currentLat: currentLat,
//         currentLong: currentLong,
//         endLat: 32.887871,
//         endLong: -117.158119
//       },
//       success: function(data){
//         console.log(data);
//       }
//     })

//     locationObj.locationName = "Ballast Point Brewing and Spirits"
//     locationObj.locationAddress = "9045 Carroll Way, San Diego, CA 92121" 
//   }),
//   fairmontGrandDelMar: L.marker([32.938412, -117.197357]).addTo(mymap).bindPopup("<b>Fairmont Grand Del Mar</b><button onclick=showMapRoute(locationObj)>Generate Map</button>.").on('click', function () {
//     $.ajax({
//       url: `http://localhost:3000/api/routeInfo/`,
//       method: `PUT`,
//       dataType: `json`,
//       data: {
//         currentLat: currentLat,
//         currentLong: currentLong,
//         endLat: 32.938412,
//         endLong: -117.197357
//       },
//       success: function(data){
//         console.log(data);
//       }
//     })

//     locationObj.locationName = "Fairmont Grand Del Mar"
//     locationObj.locationAddress = "9045 Carroll Way, San Diego, CA 92121" 
//   }),
//   petcoPark: L.marker([32.706539, -117.156349]).addTo(mymap),
//   halfDoorBrewingCompany: L.marker([32.5417302, -117.163817]).addTo(mymap),
//   theTacoStandDowntown: L.marker([32.717740, -117.158670]).addTo(mymap),
//   societeBrewingCompany: L.marker([32.834900, -117.146180]).addTo(mymap),
//   fashionValley: L.marker([32.768051, -117.166901]).addTo(mymap),
//   harrysCoffeeShop: L.marker([32.841530, -117.272440]).addTo(mymap),
//   laValenciaHotel: L.marker([32.848640, -117.273770]).addTo(mymap),
//   eddieVsPrimeSeafood: L.marker([32.849610, -117.271150]).addTo(mymap),
//   islandPrimeAndCLevel: L.marker([32.724370, -117.188640]).addTo(mymap),
//   bOBeauKitchenBar: L.marker([32.753050, -117.245110]).addTo(mymap),
//   cafeMoto: L.marker([32.695630, -117.137660]).addTo(mymap),
//   philzCoffeeShop: L.marker([32.977310, -117.230377]).addTo(mymap),
//   firstMarket: L.marker([32.5417302, -117.163817]).addTo(mymap),
//   firstMarket: L.marker([32.5417302, -117.163817]).addTo(mymap),
//   firstMarket: L.marker([32.5417302, -117.163817]).addTo(mymap),
//   firstMarket: L.marker([32.5417302, -117.163817]).addTo(mymap),
// }
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
