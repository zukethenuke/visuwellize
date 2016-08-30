function mapboxScatter(wells) {
  mapboxgl.accessToken = 'pk.eyJ1IjoienVrZXRoZW51a2UiLCJhIjoiY2lzZXl4bzkzMDBkazJzbnZpM2VtaDBqZyJ9.dG7pNd-7WKeW_3rEcq6Iqg';
    
  var bounds = [
    [-105, 45], // Southwest coordinates
    [-95, 50]  // Northeast coordinates
  ];
  
  var map = new mapboxgl.Map({
    container: 'mapboxMap',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-100.442734, 47.484052],
    zoom: 6,
    maxBounds: bounds
  });
}