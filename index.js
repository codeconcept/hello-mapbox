// documentation: https://docs.mapbox.com/help/tutorials/tilequery-healthy-food-finder/

mapboxgl.accessToken = keys.privateKey; // set the access token

const rennesParcThabor = { lat: 48.114384, lng: -1.669494 };
const liffreTownhall = { lat: 48.21407, lng: -1.50546}
const delta = 0.09;

const txtLat = document.getElementById('lat');
const txtLng = document.getElementById('lng');
const btnReverseGeocode = document.getElementById('btnReverseGeocode');
const reverseGeocodeForm = document.addEventListener('submit', reverseGeocode);
const coords = { lat: 0, lng: 0 };
btnReverseGeocode.addEventListener('click', reverseGeocode);
const mouseCoords = { lat: 0, lng: 0 };

const geocoderDiv = document.getElementById('geocoder');

var map = new mapboxgl.Map({
    container: 'map', // The container ID
    style: 'mapbox://styles/mapbox/light-v10', // The map style to use
    center: [liffreTownhall.lng, liffreTownhall.lat], // Starting position [lng, lat] is Rennes
    zoom: 15 // Starting zoom level
});

map.on('load', function() {
    var geocoder = new MapboxGeocoder({ // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      zoom: 14, // Set the zoom level for geocoding results
      language: 'fr',
      placeholder: "Enter an address or place name", // This placeholder text will display in the search bar
      bbox: [liffreTownhall.lng - delta, liffreTownhall.lat - delta, liffreTownhall.lng + delta , liffreTownhall.lat + delta] // Set a bounding box around a city
    });

    geocoderDiv.appendChild(geocoder.onAdd(map));

    // // Add the geocoder to the map
    // map.addControl(geocoder, 'top-left'); // Add the search box to the top left

    var marker = new mapboxgl.Marker({'color': '#008000'}) // Create a new green marker
    
    geocoder.on('result', function(data) { // When the geocoder returns a result
        console.log("geocoder.on('result') / data", data);
        
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
    const clickedCoords = e.lngLat.wrap();
    console.log(e.lngLat.wrap()); 
    mouseCoords.lng = clickedCoords.lng;
    mouseCoords.lat = clickedCoords.lat;
    txtLng.value = mouseCoords.lng;
    txtLat.value = mouseCoords.lat;
});

// reverse geocoding (from GPS coords to address)
function reverseGeocode(e) {
    e.preventDefault();
    const lat = txtLat.value.trim();
    const lng = txtLng.value.trim();
    console.log('reverseGeocode() lat ', lat);    
    console.log('reverseGeocode() lng ', lng);    
    if(lat === '' || lng === '') {
        console.log('lat or lng missing', lat, lng);
        return;
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${keys.privateKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
        });
}