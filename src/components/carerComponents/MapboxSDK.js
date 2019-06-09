
const mapboxClient = window.mapboxSdk
const mapboxgl = window.mapboxgl
const MapboxGeocoder =  window.MapboxGeocoder
mapboxgl.accessToken = 'pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw';

let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
mapboxClient.geocoding.forwardGeocode({
    query: 'Bol\'shaya Pereyaslavskaya Ulitsa 50.',
    autocomplete: false,
    limit: 1
})
.send()
.then(function (response) {
    if (response && response.body && response.body.features && response.body.features.length) {
    let feature = response.body.features[0];
    
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: feature.center,
        zoom: 10
});

let mapboxgl.Marker()
            .setLngLat(feature.center)
            .addTo(map);
}
});