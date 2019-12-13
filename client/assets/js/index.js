const testButton = document.getElementById("testButton")

let fetchGet = function (locationInfo) {
  fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=Caw3YlgZ6hKw9GVS49dNHOVfR1mqbGCy&location=${locationInfo}`)
.then( res => res.json())
.then(location => console.log(location))
}


testButton.onclick = function () {
 let newVar = document.getElementById("testInput").value 
 console.log(newVar)
 fetchGet(newVar)
}