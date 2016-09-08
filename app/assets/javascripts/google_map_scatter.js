
function googleMapAScatter(wells, map, mapMarkers) {

  console.log('mapMarkers length before: ', mapMarkers.length);
  for (var i = 0; i < mapMarkers.length; i++) {
    mapMarkers[i].setMap(null);
  }
  // mapMarkers = [];

  wells.forEach(function(well) {
    var marker = new google.maps.Marker({
      position: {lat: well.latitude, lng: well.longitude},
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + well.color.split('').slice(1,7).join(''),
      map: map,
      title: well.operator,
    });


    mapMarkers.push(marker);

    var infowindow = new google.maps.InfoWindow({
      content: well.wellName
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

  });
  
  // mapMarkers = [];

  console.log('mapMarkers length after: ', mapMarkers.length);

}