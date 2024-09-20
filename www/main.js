const craterList = [
    ["Copernicus crater", 245.125, 394.6875, ""],
    ["Tycho crater", 351.25, 133.75, ""],
];

const mariaList = [
    ["Mare Crisium (Sea of Crises)", 600.125, 493.25, ""],
    ["Mare Tranquillitatus (Sea of Tranquility)", 494, 428.75, ""],
];

const apolloList = [
    ["Apollo 11", 487.375, 387.25, "July 1969 - Mare Tranquillitatus"],
    ["Apollo 12", 236.25, 322, "November 1969 - Oceanus Procellarum"],
    ["Apollo 14", 267, 320.5, "February 1971 - Fra Mauro Highlands"],
    ["Apollo 15", 358.5, 502.75, "August 1971 - Hadley Rille"],
    ["Apollo 16", 460.75, 321.5, "April 1972 - Descartes Highlands"],
    ["Apollo 17", 492.75, 494.75, "December 1972 - Taurus-Littrow Valley"],
];

function init() {
    var craters = loadMarkers("crater.png", craterList);
    var maria = loadMarkers("mare.png", mariaList);
    var apollo = loadMarkers("apollo.png", apolloList);

    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -5,
        layers: [craters, maria]
    });

    var bounds = [[0, 0], [700, 700]];
    var image = L.imageOverlay('images/moon_layer.jpg', bounds).addTo(map);

    map.fitBounds(bounds);

    var overlayMaps = { "Craters": craters, "Maria": maria, "Apollo landing sites": apollo };
    L.control.layers(null, overlayMaps).addTo(map);

    map.on('contextmenu', onMapClick);
}

function xy(x, y) {
    var yx = L.latLng;

    if (Array.isArray(x)) { // When doing xy([x, y]);
        return yx(x[1], x[0]);
    }
    return yx(y, x); // When doing xy(x, y);
}

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

function loadMarkers(iconFileName, markerList) {
    var markerIcon = L.icon({ iconUrl: "images/icons/" + iconFileName, iconSize: [25, 25] });
    var newLayerGroup = L.layerGroup();

    markerList.forEach((row, i) => {
        var popupText = row[0];
        if (row[3] != "") {
            popupText = popupText + ": " + row[3];
        }
        L.marker(xy(row[1], row[2]), { icon: markerIcon, alt: row[0] }).addTo(newLayerGroup).bindPopup(popupText).bindTooltip(row[0]);
    });

    return newLayerGroup;
}