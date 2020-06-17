mapboxgl.accessToken = keys.privateKey; // set the access token

var map = new mapboxgl.Map({
    container: 'map', // The container ID
    style: 'mapbox://styles/mapbox/light-v10', // The map style to use
    center: [-105.0178157, 39.737925], // Starting position [lng, lat] is Denver
    zoom: 12 // Starting zoom level
});

map.on('load', function() {
    var geocoder = new MapboxGeocoder({ // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      zoom: 13, // Set the zoom level for geocoding results
      placeholder: "Enter an address or place name", // This placeholder text will display in the search bar
      bbox: [-105.116, 39.679, -104.898, 39.837] // Set a bounding box around Denver
    });
    // Add the geocoder to the map
    map.addControl(geocoder, 'top-left'); // Add the search box to the top left
  });  
