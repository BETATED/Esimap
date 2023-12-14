
var map;
var vectorLayer;

$(document).ready(function () {
// Initialiser la carte
 map = new ol.Map({
    target: 'map', // ID du conteneur de la carte
    layers: [
       new ol.layer.Tile({
          source: new ol.source.OSM() // Utilisation d'une couche OpenStreetMap comme exemple
       })
    ],
    view: new ol.View({
       center: ol.proj.fromLonLat([0, 0]), // Centre de la carte (longitude, latitude)
       zoom: 2 // Niveau de zoom initial
    })
 });

 // Données des points
 var points = [
    // États-Unis
    { id: 1, lon: -77.0369, lat: 38.9072 }, // Washington, D.C.
    { id: 2, lon: -74.0059, lat: 40.7128 }, // New York City
    { id: 3, lon: -118.2437, lat: 34.0522 }, // Los Angeles
    { id: 4, lon: -87.6298, lat: 41.8781 }, // Chicago
    { id: 5, lon: -95.3698, lat: 29.7604 }, // Houston
    { id: 6, lon: -122.4194, lat: 37.7749 }, // San Francisco
    { id: 7, lon: -71.0589, lat: 42.3601 }, // Boston
    { id: 8, lon: -80.1918, lat: 25.7617 }, // Miami
    { id: 9, lon: -77.2674, lat: 28.5383 }, // Orlando
    { id: 10, lon: -96.7970, lat: 32.7767 }, // Dallas
    { id: 11, lon: -84.3879, lat: 33.7490 }, // Atlanta
    { id: 12, lon: -106.4425, lat: 31.7619 }, // El Paso
    { id: 13, lon: -149.9003, lat: 61.2181 }, // Anchorage
    { id: 14, lon: -157.8583, lat: 21.3069 }, // Honolulu
 
    // Australie
    { id: 15, lon: 151.2093, lat: -33.8688 }, // Sydney
    { id: 16, lon: 144.9631, lat: -37.8136 }, // Melbourne
    { id: 17, lon: 153.0235, lat: -27.4698 }, // Brisbane
    { id: 18, lon: 115.8575, lat: -31.9505 }, // Perth
    { id: 19, lon: 149.1287, lat: -35.2820 }, // Canberra
 
    // Nouvelle-Zélande
    { id: 20, lon: 174.7762, lat: -36.8485 }, // Auckland
    { id: 21, lon: 172.6362, lat: -43.5321 }, // Christchurch
    { id: 22, lon: 175.2784, lat: -37.7870 }, // Wellington
    { id: 23, lon: 170.5036, lat: -45.8742 }, // Dunedin
    { id: 24, lon: 175.6100, lat: -40.3523 }, // Hamilton
 
    // France
    { id: 25, lon: 2.3522, lat: 48.8566 }, // Paris
    { id: 26, lon: 4.8357, lat: 45.7640 }, // Lyon
    { id: 27, lon: -1.6504, lat: 47.4784 }, // Nantes
    { id: 28, lon: 5.3595, lat: 43.2965 }, // Marseille
    { id: 29, lon: -0.5792, lat: 44.8374 }, // Bordeaux
    { id: 30, lon: 6.1296, lat: 49.6116 }, // Strasbourg
 ];
 

 // Créer une couche vectorielle
  vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
 });

 // Ajouter chaque point à la couche vectorielle
 points.forEach(function(point) {

    // Créer une icône personnalisée
    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
           src: '/img/pin.png', // Chemin vers l'image de l'icône
           scale: 0.05 // Ajuster la taille de l'icône selon tes besoins
        })
     });

    var marker = new ol.Feature({
       geometry: new ol.geom.Point(ol.proj.fromLonLat([point.lon, point.lat]))
    });

    marker.setStyle(iconStyle);

    // Ajouter le marqueur à la couche vectorielle
    vectorLayer.getSource().addFeature(marker);
 });

 // Ajouter la couche vectorielle à la carte
 map.addLayer(vectorLayer);


});

// Fonction pour actualiser les points
function updatePoints(newPoints) {
    // Effacer tous les anciens points de la couche vectorielle
    vectorLayer.getSource().clear();

    // Ajouter chaque nouveau point à la couche vectorielle
    newPoints.forEach(function(point) {
       var marker = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([point.lon, point.lat]))
       });

       // Ajouter le marqueur à la couche vectorielle
       vectorLayer.getSource().addFeature(marker);
    });
 }