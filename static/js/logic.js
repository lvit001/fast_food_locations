// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Initialize all the LayerGroups that we'll use.
let layers = {
    McDonalds: new L.LayerGroup(),
    Burger_King: new L.LayerGroup(),
    Taco_Bell: new L.LayerGroup(),
    Chick_Fil_A: new L.LayerGroup(),
    Sonic: new L.LayerGroup(),
    Arbys: new L.LayerGroup(),
    Dairy_Queen: new L.LayerGroup(),
    Subway: new L.LayerGroup(),
};

// Create the map with our layers.
let map = L.map("map-id", {
    center: [44.94, -93.26],
    zoom: 10,
    layers: [
      layers.McDonalds,
      layers.Burger_King,
      layers.Taco_Bell,
      layers.Chick_Fil_A,
      layers.Sonic,
      layers.Arbys,
      layers.Dairy_Queen,
      layers.Subway,
    ]
});

// Add our "streetmap" tile layer to the map.
streetmap.addTo(map);

// Create an overlays object to add to the layer control.
let overlays = {
    "McDonald's": layers.McDonalds,
    "Burger King": layers.Burger_King,
    "Taco Bell": layers.Taco_Bell,
    "Chick-fil-A": layers.Chick_Fil_A,
    "Sonic Drive In": layers.Sonic,
    "Arby's": layers.Arbys,
    "Dairy Queen": layers.Dairy_Queen,
    "Subway": layers.Subway,
};
  
// Create a control for our layers, and add our overlays to it.
L.control.layers(null, overlays, {
    collapsed: false
}).addTo(map);


// Initialize an object that contains icons for each layer group.
let icons = {
    McDonalds: L.ExtraMarkers.icon({
      markerColor: "red",
      shape: "circle"
    }),

    Burger_King: L.ExtraMarkers.icon({
      markerColor: "yellow",
      shape: "circle"
    }),

    Taco_Bell: L.ExtraMarkers.icon({
      markerColor: "purple",
      shape: "circle",
    }),
    Chick_Fil_A: L.ExtraMarkers.icon({
        markerColor: "orange",
        shape: "circle"
    }),

    Sonic: L.ExtraMarkers.icon({
        markerColor: "blue",
        shape: "circle"
    }),

    Arbys: L.ExtraMarkers.icon({
        markerColor: "black",
        shape: "circle",
    }),
    Dairy_Queen: L.ExtraMarkers.icon({
        markerColor: "pink",
        shape: "circle"
    }),

    Subway: L.ExtraMarkers.icon({
        markerColor: "green",
        shape: "circle"
    }),
};

// Initialize restaurantName, which will be used as a key to access the appropriate layers and icons
let restaurantName;


// use a for loop to cycle through the locations
for (let i = 0; i < locations.length; i++) {
    
    if (locations[i].Restaurant == "McDonald's") {
        restaurantName = "McDonalds";
    }
    else if (locations[i].Restaurant == "Burger King") {
        restaurantName = "Burger_King";
    }
    else if (locations[i].Restaurant == "Taco Bell") {
        restaurantName = "Taco_Bell";
    }
    else if (locations[i].Restaurant == "Chick-fil-A") {
        restaurantName = "Chick_Fil_A";
    }
    else if (locations[i].Restaurant == "Sonic Drive-In") {
        restaurantName = "Sonic";
    }
    else if (locations[i].Restaurant == "Arby's") {
        restaurantName = "Arbys";
    }
    else if (locations[i].Restaurant == "Dairy Queen") {
        restaurantName = "Dairy_Queen";
    }
    else if (locations[i].Restaurant == "Subway") {
        restaurantName = "Subway";
    }

    // Create a new marker with the appropriate icon and coordinates.
    let newMarker = L.marker([locations[i].Lat, locations[i].Long_], {
         icon: icons[restaurantName]
         });

    // Add the new marker to the appropriate layer.
    newMarker.addTo(layers[restaurantName]);

    // Bind a popup to the marker that will  display on being clicked. This will be rendered as HTML.
    newMarker.bindPopup(`<h1>${locations[i].Restaurant}</h1><hr><p> 
     Street Address: ${locations[i].Address}</p>
    <hr><p> City: ${locations[i].City}</p>`);

    // center the map on a marker when you double click it
    // code found here for fit bounds: https://jeffreymorgan.io/articles/how-to-center-a-leaflet-map-on-a-marker/
    newMarker.on('dblclick', function() {
        var latLngs = [ newMarker.getLatLng() ];
        var markerBounds = L.latLngBounds(latLngs);
        map.fitBounds(markerBounds);  
    });
}


// create a legend for the map
// helpful code found here: https://codepen.io/haakseth/pen/KQbjdO
// helpful website for finding numbers of colors found here: https://htmlcolorcodes.com/
var legend = L.control({position: 'bottomleft'});

legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h3>Restaurants</h3>";
    div.innerHTML += "<h5>*Double click marker to zoom in*</h5>";
    div.innerHTML += '<i style="background: #A42409"></i><span>McDonalds</span><br>';
    div.innerHTML += '<i style="background: #FFC300"></i><span>Burger King</span><br>';
    div.innerHTML += '<i style="background: #6A2C89"></i><span>Taco Bell</span><br>';
    div.innerHTML += '<i style="background: #FFA500"></i><span>Chick-fil-A</span><br>';
    div.innerHTML += '<i style="background: #0B75D3"></i><span>Sonic Drive-In</span><br>';
    div.innerHTML += '<i style="background: #000000"></i><span>Arbys</span><br>';
    div.innerHTML += '<i style="background: #DA70D6"></i><span>Dairy Queen</span><br>';
    div.innerHTML += '<i style="background: #008000"></i><span>Subway</span><br>';

    return div;
};

legend.addTo(map);