/**
 * @author Mike Dolbow
 * Script for geojson.html
 */

var map;
var mapOptions = {
		center: [42.72,-94.24],
		maxBounds:[
			[41.5,-91.5],
			[44,-99.9]
			],
		zoom:8
	};
//var geojsonQueryURL = 'https://services2.arcgis.com/HsXtOCMp1Nis1Ogr/arcgis/rest/services/MyMapService/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&geohash=&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson';
var geojsonQueryURL = 'https://eerscmap.usgs.gov/arcgis/rest/services/uswtdb/uswtdbDyn/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=geometryType%3DesriGeometryEnvelope%26geometry%3D%7Bxmin%3A+-98.3%2C+ymin%3A+42.1%2C+xmax%3A+-98.2%2C+ymax%3A+43.1%7D&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson';
function initgeojsonmap() {
		map = L.map('map', mapOptions);
		var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		});
		/*var basemapTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
				maxZoom: 17,
				type: 'map',
				ext: 'jpg',
				subdomains: '1234',
				attribution: 'Esri, HERE, DeLorme, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), swisstopo, MapmyIndia, © OpenStreetMap contributors, and the GIS User Community'
			});*/
		map.addLayer(Esri_WorldImagery);
		
		//var geojsonLayer = new L.GeoJSON.AJAX(geojsonQueryURL, {onEachFeature:popUp});
		//console.log("GeoJSON layer added");
		var geojsonLayer = $.getJSON(geojsonQueryURL, function(){})
		.done(function(data){
			L.geoJSON(data, {
			}).addTo(map);
		});
		
}

  function popUp(feature, layer) {
    layer.bindPopup("FAA Number: "+feature.properties.faa_asn);
  }
