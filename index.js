// documentation: https://docs.mapbox.com/help/tutorials/tilequery-healthy-food-finder/

mapboxgl.accessToken = keys.privateKey; // set the access token

const rennesParcThabor = { lat: 48.114384, lng: -1.669494 };
const liffreTownhall = { lat: 48.21407, lng: -1.50546}
const delta = 0.09;

var map = new mapboxgl.Map({
    container: 'map', // The container ID
    style: 'mapbox://styles/mapbox/light-v10', // The map style to use
    center: [liffreTownhall.lng, liffreTownhall.lat], // Starting position [lng, lat] is Rennes
    zoom: 14 // Starting zoom level
});

map.on('load', function() {
    var geocoder = new MapboxGeocoder({ // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      zoom: 14, // Set the zoom level for geocoding results
      placeholder: "Enter an address or place name", // This placeholder text will display in the search bar
      bbox: [liffreTownhall.lng - delta, liffreTownhall.lat - delta, liffreTownhall.lng + delta , liffreTownhall.lat + delta] // Set a bounding box around Rennes
    });
    // Add the geocoder to the map
    map.addControl(geocoder, 'top-left'); // Add the search box to the top left

    var marker = new mapboxgl.Marker({'color': '#008000'}) // Create a new green marker
    
    geocoder.on('result', function(data) { // When the geocoder returns a result
      var point = data.result.center; // Capture the result coordinates
    
      marker.setLngLat(point).addTo(map); // Add the marker to the map at the result coordinates
    
    });    
});  

map.addControl(
    new MapboxDirections({
        accessToken: mapboxgl.accessToken
    }),
    'bottom-left'
);

// User current position
// Add geolocate control to the map.
const geolocCtrl = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});

map.addControl(geolocCtrl);

geolocCtrl.on('geolocate', function (position) {
    console.log('geolocate evt gives position: ', position);
    
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log('lat, lng', latitude, longitude);
});

// get GPS coords of where mouse click occured
map.on('click', (e) => {
    console.log(e.lngLat.wrap()); 
})