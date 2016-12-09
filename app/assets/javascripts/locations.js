// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


function initMap(){
  center = {lat: 40.733, lng: -73.988}
  var map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 13,
    zoomControl: true,
    zoomControlOptions: {
    position: google.maps.ControlPosition.RIGHT_TOP
},
    styles: custom_styles
  });

  map.setOptions({ minZoom: 10, streetViewControl: false, mapTypeControl: true});
  google.maps.event.addDomListener(window, "resize", function() {
     google.maps.event.trigger(map, "resize");
     map.setCenter(center);
 });

  var locations = [
    ['User 1', 40.735, -73.995, 1],
    ['User 2', 40.740, -73.997, 2],
    ['User 3', 40.743, -73.996, 3],
    ['User 4', 40.745, -73.998, 4],
    ['User 5', 40.763, -73.984, 5],
    ['User 6', 40.765, -73.995, 6],
    ['User 7', 40.750, -73.980, 7],
    ['User 8', 40.758, -73.986, 8],
    ['User 9', 40.772, -73.990, 9],
    ['User 10', 40.780, -73.980, 10],
    ['User 11', 40.785, -73.965, 11],
    ['User 12', 40.750, -73.987, 12],
    ['User 13', 40.753, -73.986, 13],
    ['User 14', 40.755, -73.988, 14],
    ['User 15', 40.773, -73.984, 15],
    ['User 16', 40.775, -73.985, 16],
    ['User 17', 40.760, -73.970, 17],
    ['User 18', 40.768, -73.976, 18],
    ['User 19', 40.782, -73.980, 19],
    ['User 20', 40.780, -73.970, 20]
  ];

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 3,
        strokeColor: '#5DADE2',
        fillColor: '#5DADE2'
},
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
  // NYC Lat / Lng
  var southWest = new google.maps.LatLng(40.680000, -73.900000);
  var northEast = new google.maps.LatLng(40.800000, -73.996500);
  var lngSpan = northEast.lng() - southWest.lng();
  var latSpan = northEast.lat() - southWest.lat();
  for (var i = 0; i < 500; i++) {
  // init markers
    var marker = new google.maps.Marker({
    position: new google.maps.LatLng(southWest.lat() + latSpan * Math.random(), southWest.lng() + lngSpan * Math.random()),

    icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 3,
        strokeColor: '#5DADE2',
        fillColor: '#5DADE2'
    },
    map: map,
    });

      // process multiple info windows
      (function(marker, i) {
      // add click event
      google.maps.event.addListener(marker, 'click', function() {
      infowindow = new google.maps.InfoWindow({
        content: 'You are not alone!!'
      });
        infowindow.open(map, marker);
      });
      })(marker, i);
  }

  var geocoder = new google.maps.Geocoder();
  document.getElementById('submit').addEventListener('click', function() {
  clearMarkers();
  geocodeAddress(geocoder, map);
});
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}



var neighborhoods = [
        {lat: 40.745, lng: -73.997},
        {lat: 40.740, lng: -73.996},
        {lat: 40.742, lng: -73.994},
        {lat: 40.741, lng: -73.993}
      ];

      // function initMap(){
      //   center = {lat: 40.733, lng: -73.988}
      //   var map = new google.maps.Map(document.getElementById('map'), {
      //     center: center,
      //     zoom: 13,
      //     zoomControl: true,
      //     zoomControlOptions: {
      //     position: google.maps.ControlPosition.RIGHT_TOP
      // },
      //     styles: custom_styles
      //   });
      // }
      var markers = [];
      var map;

      function drop() {
        debugger;
        clearMarkers();
        for (var i = 0; i < neighborhoods.length; i++) {
          addMarkerWithTimeout(neighborhoods[i], i * 200);
        }
      }

      function addMarkerWithTimeout(position, timeout) {
        window.setTimeout(function() {
          markers.push(new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP
          }));
        }, timeout);
      }

      function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      }

var custom_styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]
