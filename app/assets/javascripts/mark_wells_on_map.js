
function initMap(wells) {

  // var addGeoJsonToWells = function(wells) {
  //   wells.map(function(well) {
  //     well.geojson = {
  //       type: "Feature",
  //       properties: {
  //         operator: well.operator,
  //         depth: well.depth
  //         cumOil: 
  //       }
  //     };
  //   });
  // };

  var markers = [
    {
      coords: {lat: 52.6663, lng: 0.1588},
      info: "Wisbech"
    },
    {
      coords: {lat: 51.1279, lng: 1.3134},
      info: "Dover"
    },
    {
      coords: {lat: 49.7150, lng: -2.1974},
      info: "Alderney"
    },
    {
      coords: {lat: 28.2916, lng: -16.6291},
      info: "Tenerife"
    },
    {
      coords: {lat: 14.6415, lng: -61.0242},
      info: "Martinique"
    },
    {
      coords: {lat: 12.1696, lng: -68.9900},
      info: "Curacau"
    },
    {
      coords: {lat: 16.3298, lng: -86.5300},
      info: "Roatan"
    }
  ];

  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    minZoom: 7,
    center: {lat: 47.484052, lng: -100.442734}
  });

  var strictBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(45, -105),
  new google.maps.LatLng(50, -95) 
  );



  markers.forEach(function(d) {
    var marker = new google.maps.Marker({
      position: d.coords,
      map: map,
      title: d.info
    });

    var infowindow = new google.maps.InfoWindow({
      content: d.info
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });

}