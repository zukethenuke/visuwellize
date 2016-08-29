
function initMap(wells) {
  console.log('map',wells);

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    minZoom: 7,
    center: {lat: 47.484052, lng: -100.442734}
  });

  var strictBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(45, -105),
  new google.maps.LatLng(50, -95) 
  );

  wells.forEach(function(well) {
    var marker = new google.maps.Marker({
      position: {lat: well.latitude, lng: well.longitude},
      map: map,
      title: well.operator
    });

    var infowindow = new google.maps.InfoWindow({
      content: well.operator
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });
}