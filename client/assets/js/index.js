const testButton = document.getElementById("testButton")


let fetchGet = function (locationInfo) {
  fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=Caw3YlgZ6hKw9GVS49dNHOVfR1mqbGCy&location=${locationInfo}`)
.then( res => res.json())
.then(location => console.log(location))
document.getElementById("imgTest").src = "https://www.mapquestapi.com/staticmap/v4/getmap?key=Caw3YlgZ6hKw9GVS49dNHOVfR1mqbGCy&size=600,400&zoom=11&center=32.81576,-117.163817"
}


testButton.onclick = function () {
 let newVar = document.getElementById("testInput").value 
 console.log(newVar)
 fetchGet(newVar)
}