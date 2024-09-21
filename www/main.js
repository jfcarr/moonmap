const craterList = [
    ["Archimedes", 314.78125, 513.9375, "", "https://en.wikipedia.org/wiki/Archimedes_(crater)"],
    ["Aristarchus", 123.15625, 447.734375, "", "https://en.wikipedia.org/wiki/Aristarchus_(crater)"],
    ["Byrgius", 116.875, 179.75, "", "https://en.wikipedia.org/wiki/Byrgius_(crater)"],
    ["Copernicus", 245.125, 394.6875, "", "https://en.wikipedia.org/wiki/Copernicus_(lunar_crater)"],
    ["Eratosthenes", 290.28125, 429.125, "", "https://en.wikipedia.org/wiki/Eratosthenes_(crater)"],
    ["Grimaldi", 68, 275.5, "", "https://en.wikipedia.org/wiki/Grimaldi_(crater)"],
    ["Kepler", 158.875, 370.46875, "", "https://en.wikipedia.org/wiki/Kepler_(lunar_crater)"],
    ["Langrenus", 638, 355.625, "", "https://en.wikipedia.org/wiki/Langrenus_(crater)"],
    ["Plato", 284.15625, 599.5625, "", "https://en.wikipedia.org/wiki/Plato_(crater)"],
    ["Posidonius", 464.875, 548.5625, "", "https://en.wikipedia.org/wiki/Posidonius_(crater)"],
    ["Stevinus", 601.90625, 224.6875, "", "https://en.wikipedia.org/wiki/Stevinus_(crater)"],
    ["Tycho", 351.25, 133.75, "", "https://en.wikipedia.org/wiki/Tycho_(lunar_crater)"],
];

const mariaList = [
    ["Mare Crisium (Sea of Crises)", 600.125, 493.25, "", "https://en.wikipedia.org/wiki/Mare_Crisium"],
    ["Mare Fecunditatis (Sea of Fecundity)", 606.75, 385.5, "", "https://en.wikipedia.org/wiki/Mare_Fecunditatis"],
    ["Mare Frigoris (Sea of Cold)", 288.25, 623.25, "", "https://en.wikipedia.org/wiki/Mare_Frigoris"],
    ["Mare Humorum (Sea of Humidity)", 196.5, 202.5, "", "https://en.wikipedia.org/wiki/Mare_Humorum"],
    ["Mare Imbrium (Sea of Rains)", 250.25, 528.25, "", "https://en.wikipedia.org/wiki/Mare_Imbrium"],
    ["Mare Nectaris (Sea of Nectar)", 546.75, 305.5, "", "https://en.wikipedia.org/wiki/Mare_Nectaris"],
    ["Mare Nubium (Sea of Clouds)", 303.625, 231.25, "", "https://en.wikipedia.org/wiki/Mare_Nubium"],
    ["Mare Serenitatis (Sea of Serenity)", 429.5, 512.5, "", "https://en.wikipedia.org/wiki/Mare_Serenitatis"],
    ["Mare Tranquillitatis (Sea of Tranquility)", 494, 428.75, "", "https://en.wikipedia.org/wiki/Mare_Tranquillitatis"],
    ["Mare Vaporum (Sea of Vapors)", 374.875, 436.5, "", "https://en.wikipedia.org/wiki/Mare_Vaporum"],
    ["Oceanus Procellarum (Ocean of Storms)", 107, 373, "", "https://en.wikipedia.org/wiki/Oceanus_Procellarum"],
];

const apolloList = [
    ["Apollo 11", 487.375, 387.25, "July 1969 - Mare Tranquillitatus", "https://en.wikipedia.org/wiki/Apollo_11"],
    ["Apollo 12", 236.25, 322, "November 1969 - Oceanus Procellarum", "https://en.wikipedia.org/wiki/Apollo_12"],
    ["Apollo 14", 267, 320.5, "February 1971 - Fra Mauro Highlands", "https://en.wikipedia.org/wiki/Apollo_14"],
    ["Apollo 15", 358.5, 502.75, "August 1971 - Hadley Rille", "https://en.wikipedia.org/wiki/Apollo_15"],
    ["Apollo 16", 460.75, 321.5, "April 1972 - Descartes Highlands", "https://en.wikipedia.org/wiki/Apollo_16"],
    ["Apollo 17", 492.75, 494.75, "December 1972 - Taurus-Littrow Valley", "https://en.wikipedia.org/wiki/Apollo_17"],
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
        if (row[4] != "") {
            popupText = popupText + "<hr><a href='" + row[4] + "' target='_blank'>More info</a>"
        }

        L.marker(xy(row[1], row[2]), { icon: markerIcon, alt: row[0] }).addTo(newLayerGroup).bindPopup(popupText).bindTooltip(row[0]);
    });

    return newLayerGroup;
}