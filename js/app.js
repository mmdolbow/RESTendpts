/**
 * @author Mike Dolbow
 * An application support script for demonstrating capabilities of Esri REST Endpoints.
 */

/**
 * Globals
 * 
*/

var map;
var mapOptions = {
		maxZoom:7,
		minZoom:7,
		zoomControl:'false',
		center: [37.0,-90.0],
		zoom:7,
		maxBounds:[
			[34.5,-98.0],
			[41.0,-79.0]
			]
	};
var dynMapServiceURL = '//sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer';

/**
 * On Click function for btnQueryRandDemo.
 * Picks a letter of the alphabet at random, and fires a query against the Detailed Counties
 * layer in order to get many results, and display some details from the first result. (Might need to exclude "X", but "Z" works)
 */

function initpnpmap() {	
		$('#loader').show();
		map = L.map('map', mapOptions);
		map.removeControl(map.zoomControl);
		var marker = L.marker(map.getCenter()).addTo(map);

		var basemapTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
				maxZoom: 17,
				type: 'map',
				ext: 'jpg',
				subdomains: '1234',
				attribution: 'Esri, HERE, DeLorme, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), swisstopo, MapmyIndia, © OpenStreetMap contributors, and the GIS User Community'
			});
		map.addLayer(basemapTileLayer);
		
		var ctyService = L.esri.dynamicMapLayer({
		    url: dynMapServiceURL,
		    opacity: 0.25
		  }).addTo(map);

		ctyService.on('load', function(e) {
			$('#loader').hide();
		});
		
		map.whenReady(function() {
		    map.on('moveend', function() {
		    	   	marker.setLatLng(map.getCenter());
					   mapquery(map.getCenter());
					   $('#loader').show();
		    	});
		});
		
	}

function mapquery(pntLatLng) {
	console.log("Map was moved to: "+pntLatLng.lat+", "+pntLatLng.lng);
	var queryURL = dynMapServiceURL+'/2/query?geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=false&f=json&geometry='+pntLatLng.lng+'%2C'+pntLatLng.lat;
	$("#emPnPURL").html('<a target=\"_blank\" href=\"'+queryURL+'\">Query URL (new window)<\/a>');
	//Make an AJAX request against the Esri service to acquire demographics info at the lat long
	//sample query: https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/2/query?geometry=-96.21826%2C47.88688&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=false&f=pjson
    $.ajax({
	    url: queryURL,
	    dataType: "jsonp",
	    cache: "false"
	})
 	.done(function( data, url ) {
 		//console.table(data);
		$("#emPnPCounty").html(data.features[0].attributes.NAME+", "+data.features[0].attributes.STATE_NAME);
		$("#emPnPPop").html(data.features[0].attributes.POP2007);
		$('#loader').hide();
	});
}

function getRandomCounty() {
	//pick a random letter to start a query with, excluding X
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWYZ';
	var randomChar = chars[Math.round(Math.random() * (chars.length - 1))];
	var url1 = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/2/query?outFields=NAME%2C+POP2007&returnGeometry=false&f=json&text="+randomChar;
	
	//Make an AJAX request against the Esri service to acquire counties that begin with the random letter
    $.ajax({
	    url: url1,
	    dataType: "jsonp",
	    cache: "false"
	})
 	.done(function( data ) {
		$("#emQueryRandURL").html('<a target=\"_blank\" href=\"'+url1+'\">Detailed Counties Starting with '+randomChar+'<\/a>');
		$("#emQueryNoCounties").html(data.features.length);
		$("#emQueryFirstCounty").html(data.features[0].attributes.NAME);
		$("#emQueryPop").html(data.features[0].attributes.POP2007);
	});

}