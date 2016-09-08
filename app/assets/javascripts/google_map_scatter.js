
function googleMapAScatter(wells, map) {

  wells.forEach(function(well) {
    var marker = new google.maps.Marker({
      position: {lat: well.latitude, lng: well.longitude},
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + well.color.split('').slice(1,7).join(''),
      map: map,
      title: well.operator,
    });

    var infowindow = new google.maps.InfoWindow({
      content: well.wellName

    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });
}