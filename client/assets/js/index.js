

const testButton = document.getElementById("testButton")
const mapQuestURL = "https://www.mapquestapi.com/staticmap/v4/getmap?key=Caw3YlgZ6hKw9GVS49dNHOVfR1mqbGCy&size=600,400&zoom=11&center=42.81576,-117.163817"

let getLocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(printLocation);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

let printLocation = function (position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  console.log(`Latitude: ${latitude}, Longitutde: ${longitude}`)
  
} 

let fetchGet = function (locationInfo) {
  fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=Caw3YlgZ6hKw9GVS49dNHOVfR1mqbGCy&location=${locationInfo}`)
.then( res => res.json())
.then(location => console.log(location))
document.getElementById("imgTest").src = mapQuestURL
getLocation();
}


testButton.onclick = function () {
 let newVar = document.getElementById("testInput").value 
 console.log(newVar)
 fetchGet(newVar)
}