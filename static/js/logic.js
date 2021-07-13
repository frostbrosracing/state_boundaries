// Creating map object
var myMap = L.map("map", {
  center: [38, -95],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// If data.beta.nyc is down comment out this link
var link = "https://raw.githubusercontent.com/frostbrosracing/state_boundaries_map/main/static/data/states.json";


// Use this link to get the geojson data.
// var link = "static/data/nyc.geojson";

// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(name) {
  switch (name) {
    case "Arizona": 
    return "red";
  case "Arkansas": 
    return "yellow";
  case "California": 
    return "pink";
  case "Colorado": 
    return "green";
  case "Connecticut": 
    return "orange";
  case "District of Columbia": 
    return "purple";
  case "Georgia": 
    return "blue";
  case "Hawaii": 
    return "teal";
  case "Illinois": 
    return "orangered";
  case "Indiana": 
    return "chartreuse";
  case "Louisiana": 
    return "red";
  case "Minnesota": 
    return "yellow";
  case "Mississippi": 
    return "pink";
  case "Montana": 
    return "green";
  case "New Mexico": 
    return "orange";
  case "North Dakota": 
    return "purple";
  case "Oklahoma": 
    return "blue";
  case "Pennsylvania": 
    return "teal";
  case "Tennessee": 
    return "orangered";
  case "Virginia": 
    return "chartreuse";
  case "Puerto Rico": 
    return "red";
  case "Delaware": 
    return "yellow";
  case "West Virginia": 
    return "pink";
  case "Wisconsin": 
    return "green";
  case "Wyoming": 
    return "orange";
  case "Alabama": 
    return "purple";
  case "Alaska": 
    return "blue";
  case "Florida": 
    return "teal";
  case "Idaho": 
    return "orangered";
  case "Kansas": 
    return "chartreuse";
  case "Maryland": 
    return "red";
  case "New Jersey": 
    return "yellow";
  case "North Carolina": 
    return "pink";
  case "South Carolina": 
    return "green";
  case "Washington": 
    return "orange";
  case "Vermont": 
    return "purple";
  case "Utah": 
    return "blue";
  case "Iowa": 
    return "teal";
  case "Kentucky": 
    return "orangered";
  case "Maine": 
    return "chartreuse";
  case "Massachusetts": 
    return "red";
  case "Michigan": 
    return "yellow";
  case "Missouri": 
    return "pink";
  case "Nebraska": 
    return "green";
  case "Nevada": 
    return "orange";
  case "New Hampshire": 
    return "purple";
  case "New York": 
    return "blue";
  case "Ohio": 
    return "teal";
  case "Oregon": 
    return "orangered";
  case "Rhode Island": 
    return "chartreuse";
  case "South Dakota": 
    return "red";
  case "Texas": 
    return "yellow";
  }
}

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "red",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.NAME),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 1
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h2>" + feature.properties.NAME + "</h2>");
    }
  }).addTo(myMap);
});
