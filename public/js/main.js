function initMap() {
  var data_sources = data.data;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {
      lat: 37.0,
      lng: 137.5
    },
    mapTypeControl: true
  });

  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);

  var iconSize = {
    x: 25,
    y: 10
  };
  var iconPath = ['M ', -iconSize.x, ',', -iconSize.y, ' L ', -iconSize.x, ',', iconSize.y, ' ', iconSize.x, ',', iconSize.y, ' ', iconSize.x, ',', -iconSize.y, ' z'].join('');
  var markers = data_sources.map(function(data_source, i) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(data_source.latitude, data_source.longitude),
      label: {
        color: '#fff',
        text: data_source.price + ''
      },
      icon: {
        path: iconPath,
        fillColor: '#000',
        fillOpacity: 0.5
      }
    });
  });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath: './img/m',
    gridSize: 60
  });
}
