
function googleMapAScatter(wells) {

  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 7,
    minZoom: 7,
    center: {lat: 47.484052, lng: -100.442734}
  });

  wells.forEach(function(well) {
    var marker = new google.maps.Marker({
      position: {lat: well.latitude, lng: well.longitude},
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + well.color.split('').slice(1,7).join(''),
      map: map,
      title: well.operator,
    });

    var infowindow = new google.maps.InfoWindow({
      content: well.operator
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });
}