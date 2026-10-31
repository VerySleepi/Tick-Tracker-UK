var map = L.map('map').setView([55.765, -4.5420], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 5,
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function getCities() {
    try {
        const response = await fetch("data/ukcities.geojson");

        if (!response.ok) {
            throw new Error("Could not fetch UK cities data");
        }

        return await response.json();
    }
    catch (error) {
        console.error("Error fetching UK cities data:", error);
    }
}

async function addCityMarkers() {
    try {

        const data = await getCities();

        var greenIcon = L.icon({
            iconUrl: 'images/bigcitymarker.png',

            iconSize: [32, 37],
            iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -33]
        });

        // Creates a GeoJSON layer, takes each feature from data and creates a marker at the feature's coordinates, 
        // then bind feature properties to a popup
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                console.log(feature.geometry.coordinates, latlng);
                return L.marker(latlng, { icon: greenIcon }).bindPopup(`<b>${feature.properties.city}</b>`);
            }
        }).addTo(map);

    }
    catch (error) {
        console.error("Error fetching UK cities data:", error);
    }
}

async function addTickSightings() {
    try {
        let sightings = await getAllTickSightings();
        let cities = await getCities();
        for (const sighting of sightings) {
            for (const feature of cities.features) {
                if (sighting.location === feature.properties.city) {
                    let latlng = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
                    L.circle(latlng, { radius: 9000 }).bindPopup(`<b>${sighting.location}</b><br>Id:${sighting.id}<br>Date: ${sighting.date}`).addTo(map);
                }

            }

        }
    }
    catch (error) {
        console.error("Error fetching tick sightings data:", error);
    }
}


addCityMarkers();
addTickSightings();