mapboxgl.accessToken = keys.privateKey; // set the access token

var map = new mapboxgl.Map({
    container: 'map', // The container ID
    style: 'mapbox://styles/mapbox/light-v10', // The map style to use
    center: [-105.0178157, 39.737925], // Starting position [lng, lat]
    zoom: 12 // Starting zoom level
});

console.log(map);
