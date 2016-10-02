function initialize() {
	"use strict";
	// Create an array of styles.
	var styles = [
	  {
		"elementType": "geometry.fill",
		"stylers": [
		  { "color": "#e1e1e1" }
		]
	  },{
		"elementType": "geometry.stroke",
		"stylers": [
		  { "color": "#808080" }
		]
	  },{
		"elementType": "labels.icon",
		"stylers": [
		  { "saturation": -100 },
		  { "lightness": -4 },
		  { "gamma": 0.52 }
		]
	  },{
		"featureType": "road",
		"elementType": "geometry.fill",
		"stylers": [
		  { "color": "#ffffff" }
		]
	  },{
		"featureType": "road",
		"elementType": "geometry.stroke",
		"stylers": [
		  { "visibility": "off" }
		]
	  },{
		"featureType": "road",
		"elementType": "labels.icon",
		"stylers": [
		  { "visibility": "off" }
		]
	  },{
		"featureType": "water",
		"elementType": "geometry.stroke",
		"stylers": [
		  { "visibility": "off" }
		]
	  },{
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
		  { "color": "#333333" }
		]
	  },{
		"featureType": "water",
		"elementType": "labels.icon",
		"stylers": [
		  { "visibility": "off" }
		]
	  },{
		"featureType": "poi",
		"elementType": "labels",
		"stylers": [
		  { "visibility": "simplified" }
		]
	  },{
		"featureType": "transit",
		"elementType": "geometry",
		"stylers": [
		  { "color": "#999999" }
		]
	  },{
		"featureType": "transit",
		"elementType": "labels",
		"stylers": [
		  { "visibility": "simplified" }
		]
	  },{
		"elementType": "labels.text.fill",
		"stylers": [
		  { "color": "#666666" }
		]
	  },{
		"featureType": "poi",
		"elementType": "geometry.fill",
		"stylers": [
		  { "color": "#bebebe" }
		]
	  },{
		"featureType": "water",
		"elementType": "geometry.fill",
		"stylers": [
		  { "color": "#777777" }
		]
	  },{
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
		  { "color": "#ffffff" }
		]
	  },{
		"featureType": "water",
		"elementType": "labels.text.stroke",
		"stylers": [
		  { "visibility": "off" }
		]
	  },{
		"featureType": "landscape.natural",
		"elementType": "labels",
		"stylers": [
		  { "color": "#808080" },
		  { "visibility": "off" }
		]
	  },{
		"featureType": "landscape.natural",
		"elementType": "geometry.fill",
		"stylers": [
		  { "color": "#999999" },
		  { "visibility": "on" }
		]
	  }
	];
                                                
	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(styles,
		{name: "Styled Map"});

	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var mapOptions = {
		zoom: 11,
		center: new google.maps.LatLng(40.722022,-73.991045),
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		}
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
}
google.maps.event.addDomListener(window, 'load', initialize);