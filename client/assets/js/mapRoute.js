
const mymap = L.map('mapRouteId', {closePopupOnClick: false}).setView([32.81576, -117.163817], 12);
const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);;
// const myMarker= L.marker([currentLat, currentLong]).addTo(mymap);

let printMap = function (Lat, Long) {
    mymap.setView([Lat, Long], 12)
    // myMarker.setLatLng([Lat, Long], 12).bindPopup("<b>You are here!</b>.").openPopup();
  }
printMap(33.2417075, -117.2692269)

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam');

fetch(`http://localhost:3000/api/routeInfo`)
.then(res => res.json())
.then(data => console.log(data))