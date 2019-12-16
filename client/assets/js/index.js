

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
  //  mapQuestStatic = `http://www.mapquestapi.com/staticmap/v5/map?key=Caw3YlgZ6hKw9GVS49dNHOVfR1mqbGCy&type=map&size=600,400&locations=${latitude},${longitude}|marker-sm-50318A-1&scalebar=true&zoom=12&rand=1848547955`
  console.log(`Latitude: ${latitude}, Longitutde: ${longitude}`)
  // printMap(); 
  fetchGet(latitude, longitude)
} 

let fetchGet = function (paramOne, paramTwo) {
  fetch(`http://localhost:3000/MapQuestInfo/${paramOne}/${paramTwo}`)
.then( res => res.json())
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