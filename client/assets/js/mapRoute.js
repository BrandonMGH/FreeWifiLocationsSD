fetch(`http://localhost:3000/api/routeInfo`)
.then(res => res.json())
.then(data => {
  console.log(data)
  let currentLat = data.currentLat
  let currentLong = data.currentLong
  let endLat = data.endLat
  let endLong = data.endLong 
  const mymap = L.map('mapRouteId', {closePopupOnClick: false}).setView([32.81576, -117.163817], 12);
  const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);;
  const myMarker= L.marker([currentLat, currentLong]).addTo(mymap);
  const endMarker = L.marker([endLat, endLong]).addTo(mymap);

  let printMap = function (Lat, Long) {
    mymap.setView([Lat, Long], 12)
    myMarker.setLatLng([Lat, Long], 12).bindPopup("<b>You are here!</b>.").openPopup();
  }

  printMap(currentLat, currentLong)

})