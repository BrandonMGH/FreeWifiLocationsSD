

const currentLocButton = document.getElementById("currentLocButton")
const customLocButton = document.getElementById("customLocButton")


let latitude = "32.81576"
let longitude = "-117.163817"
let mapQuestStatic = `http://www.mapquestapi.com/staticmap/v5/map?key=Caw3YlgZ6hKw9GVS49dNHOVfR1mqbGCy&type=map&size=600,400&locations=${latitude},${longitude}|marker-sm-50318A-1&scalebar=true&zoom=12&rand=1848547955`

let getLocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCords);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

let printMap = function () {
  console.log(latitude, longitude)
  console.log(mapQuestStatic)
  document.getElementById("imgTest").src = mapQuestStatic
}

let getCords = function (position) {
   latitude = position.coords.latitude
   longitude = position.coords.longitude
   mapQuestStatic = `http://www.mapquestapi.com/staticmap/v5/map?key=Caw3YlgZ6hKw9GVS49dNHOVfR1mqbGCy&type=map&size=600,400&locations=${latitude},${longitude}|marker-sm-50318A-1&scalebar=true&zoom=12&rand=1848547955`
  console.log(`Latitude: ${latitude}, Longitutde: ${longitude}`)
  printMap(); 
} 

let fetchGet = function (locationInfo) {
  fetch(`http://localhost:3000/MapQuestInfo`)
.then( res => res.json())
.then(data => console.log(data))
}


customLocButton.onclick = function () {

 fetchGet()
}

currentLocButton.onclick = function () {
  getLocation()
}