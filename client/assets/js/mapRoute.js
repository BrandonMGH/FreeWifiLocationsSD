let mapGenerate = document.getElementById("mapRouteRefresh")
let addressTitle = document.getElementById("addressTitle")
let locationName;
let locationAddress = "123 Home Street, Miramar, San Diego, 92056"

mapGenerate.onclick = function () {
  window.location.reload(true);
  addressTitle.innerHTML = locationName
}

fetch(`http://localhost:3000/api/routeInfo`)
.then(res => res.json())
.then(data => {
  console.log(data)
  locationName = data.locationName
  locationAddress = data.locationAddress
  let currentLat = data.currentLat
  let currentLong = data.currentLong
  let endLat = data.endLat
  let endLong = data.endLong 
  const mymap = L.map('mapRouteId', {closePopupOnClick: false}).setView([32.81576, -117.163817], 12);
  const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);;

  let printMap = function () {
    mymap.setView([32.81576, -117.163817], 12)
  }

  printMap()

  L.Routing.control({
    waypoints: [
      L.latLng(currentLat, currentLong),
      L.latLng(endLat, endLong)
    ],
  }).addTo(mymap);

})

